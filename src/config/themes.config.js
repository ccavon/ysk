const defaultPageSize = window.screen.height >= 1000 ? 10 : 30;
export default {
  navTheme: 'light', // theme for nav menu dark
  primaryColor: '#1890FF', // primary color of ant design
  layout: 'sidemenu', // nav menu position: sidemenu or topmenu
  contentWidth: 'Fluid', // layout of content: Fluid or Fixed, only works when layout is topmenu
  fixedHeader: true, // sticky header
  autoHideHeader: false, // auto hide header
  fixedDetailHeader:true,
  fixSiderbar: true, // sticky siderbar
  pagesizeOptions: "10,30,50,100",//todo - table pagesize option 
  defaultPageSize:defaultPageSize,//todo - global table pageSize Init
  responceCol:{xs: 24, sm: 12, md: 12, lg: 12 , xl: 8 , xxl: 8 },
  responceColTwo:{xs: 24, sm: 12, md: 12, lg: 12 , xl: 12 , xxl: 12 },
}