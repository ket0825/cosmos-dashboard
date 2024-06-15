
import React from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { useTheme } from '@mui/material/styles';
import { useEffect, useState, useRef } from 'react';
import RouteHandler from '../api/RouteHandler';
import Pagination from '@mui/material/Pagination';
import { Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Stack from '@mui/system/Stack';
import { apiUrl, stage } from '../settings';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { categoryNameMapper } from '../utils/categoryNameMapper';
import ModeTopic from '../components/dashboard/ModeTopic';
import * as dfd from 'danfojs';
import KanoChart from '../components/dashboard/KanoChart';
import TopNPieChart from '../components/dashboard/TopNPieChart';


import { topicCodeMapper } from '../utils/topicCodeMapper';
import PolarizedBoxPlot from '../components/dashboard/PolarizedBoxPlot';
import PolarizedTable from '../components/dashboard/PolarizedTable';


/**
 * 카테고리 별로 소비자가 민감하게 보는 것을 확인하게끔...
 * Product와는 다르게 가자.
 * 
 * 
 * 이 부분부터 구현 필요.
 */

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.secondary,
  }));

const CategoryDetailPage:React.FC = () => {
  const routeHandler = new RouteHandler(stage, apiUrl);
  const theme = useTheme();
  const appBarHeight = theme.mixins.toolbar.minHeight;
  const location = useLocation();
  const { type, caid, s_category } = location.state;
  const N:number = 7;
  
  
  const [topics, setTopics] = React.useState<TopicType[]>([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState('')
  const maxFrequencyArrayRef = useRef<[string, number]>(["", 0]);
  const frequencyMapRef = useRef<{ [key: string]: number }>({});
  const kanoDataRef = useRef<KanoData[] | null>(null);
  const polarizedDataRef = useRef<PolarizedData[] | null>(null);

  const rerenderingCount = useRef(0);

  const getTopicCodeFrequency = (topics: TopicType[]) => {
    const frequencyMap: { [key: string]: number } = {};
  
    topics.forEach((topic) => {
        if (frequencyMap[topic.topic_code]) {
          frequencyMap[topic.topic_code]++;
        } else {
          frequencyMap[topic.topic_code] = 1;
        }
    });
    frequencyMapRef.current = frequencyMap;
  }  

    useEffect(() => {        
        const fetchTopics = async () => {
            try {
                const response = await routeHandler.getTopicByType("RT0", undefined, caid)
                // console.log(`response: ${JSON.stringify(response, null, 2)}`)
                setTopics(response)
                console.log(response.length)
            } catch (error) {
                setLoading(false)
                if (error instanceof Error) {
                    setError(error.message)
                } else {
                    throw error;
                }
            }
        }
        fetchTopics();
    }, []);


    useEffect(() => {
        if (topics.length !== 0) {
        getTopicCodeFrequency(topics);        
        let maxFrequencyTopic = '';
        let maxFrequency = 0;
        
        for (const topic in frequencyMapRef.current) {
        if (frequencyMapRef.current[topic] > maxFrequency) {
            maxFrequencyTopic = topic;
            maxFrequency = frequencyMapRef.current[topic];
            }            
        }    
        
        maxFrequencyArrayRef.current = [maxFrequencyTopic, maxFrequency];
        
        const { caid } = location.state;

        // const fetchKanoModel = async () => {
        //     try {
        //         const response = await routeHandler.getKanoModelData("RT0", caid);        
        //         // console.log(`response: ${JSON.stringify(response, null, 2)}`)
        //         kanoDataRef.current = response;
        //         console.log(response);
        //         setLoading(false);
        //     } catch (error) {
        //         if (error instanceof Error) {
        //             setError(error.message)
        //         } else {
        //             throw error;
        //         }
        //     }
        // }
        // fetchKanoModel();

        const fetchPolarizedData = async () => {
            try {
                const response = await routeHandler.getPolarizedData("RT0", caid);        
                console.log(`response: ${JSON.stringify(response, null, 2)}`)
                polarizedDataRef.current = response;
                console.log(response);                
            } catch (error) {
                if (error instanceof Error) {
                    setError(error.message)
                } else {
                    throw error;
                }
            }
        }
        fetchPolarizedData();
        setLoading(false);
        }        
    }, [topics, location.state]);

    console.log("리렌더링 횟수:",rerenderingCount.current)
    rerenderingCount.current += 1;  

    if (loading) {
        console.log("loading...")
        return (
            <>
            <div style={{marginTop: appBarHeight}}/>            
            <Typography gutterBottom variant="h4" component="div">
                Loading...
            </Typography>
            </>            
        )
    } else if (error) {
        console.log("error!")
        return (
            <>
            <div style={{marginTop: appBarHeight}}/>            
            <Typography gutterBottom variant="h4" component="div">
                ERROR! {error}
            </Typography>
            </>            
        )
    }
    console.log("렌더링중")

    return (
        <>
            <div style={{marginTop: appBarHeight}}/>
            <Typography gutterBottom variant="h4" component="div">
                {categoryNameMapper[s_category]} 토픽 대시보드
            </Typography>
            <Grid container rowSpacing={{ xs: 4, sm: 4, md: 4, lg:4, xl:4 }}
                direction="row">
                <Grid xs={4}>                                        
                    {/* <ModeTopic topicCode={maxFrequencyArrayRef.current[0]} 
                        topicCount={maxFrequencyArrayRef.current[1]} 
                        startDate='start_date' 
                        endDate='end_date'/> */}
                    <Typography gutterBottom variant="h6" component="div">
                        가장 많이 나온 토픽
                    </Typography>
                    <Item>
                    <Typography gutterBottom variant="h5" component="div" textAlign='center'>
                        {`${topicCodeMapper[maxFrequencyArrayRef.current[0]]}: ${maxFrequencyArrayRef.current[1]} 건`}
                    </Typography>  
                    </Item>
                </Grid>                
                {/* <Grid xs={12}>
                    <Typography gutterBottom variant="h6" component="div">
                        Kano 모델
                    </Typography>
                    <KanoChart kanoData={kanoDataRef.current!}/>                    
                </Grid> */}

                {/* rechart 애들은 Grid로만 감싸면 잘 적용되지 않음. */}
                {frequencyMapRef.current !== null ? <Grid xs={12}>
                    <Typography gutterBottom variant="h6" component="div">
                        상위 {N}개 토픽
                    </Typography>
                    <TopNPieChart data={frequencyMapRef.current} n={N}/>                    
                    </Grid> : null}                                    

                {polarizedDataRef.current !== null ?
                <Grid xs={12}>
                    <Typography gutterBottom variant="h6" component="div">
                        가장 호불호가 갈리는 토픽 7개
                    </Typography>
                    <PolarizedBoxPlot polarizedData={polarizedDataRef.current}/>
                </Grid> : null}

                {polarizedDataRef.current !== null ?
                <Grid xs={12}>
                    <Typography gutterBottom variant="h6" component="div">
                        토픽 별 편차 테이블
                    </Typography>                    
                </Grid> : null}                

                {polarizedDataRef.current !== null ?
                <Grid xs={8}>
                    <PolarizedTable polarizedData={polarizedDataRef.current}/>
                </Grid> : null}

                
            </Grid>
        </>
    );
}

export default CategoryDetailPage