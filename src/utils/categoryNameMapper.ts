interface CategoryNameMapping {
    [key: string]: string;
    keyboard: string;
    extra_battery: string;
  }
  
  const categoryNameMapper: CategoryNameMapping = {
    keyboard: "키보드",
    extra_battery: "보조배터리",
  };

  export { categoryNameMapper };
  