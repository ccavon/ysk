import React from 'react';
import ContentLoader from 'react-content-loader'

export const Skeleton = ()=>(<div style={{height:33}}>
  <ContentLoader 
    height={30}
    speed={1}
    primaryColor="#f3f3f3"
    secondaryColor="#ecebeb"
  >
    <rect x="3" y="8" rx="4" ry="4" width="100" height="8" /> 
    <rect x="120" y="8" rx="4" ry="4" width="160" height="8" /> 
  </ContentLoader>
</div>)

export const FormItemSkeleton = ()=>(<div style={{height:33}}>
  <ContentLoader 
    height={30}
    speed={1}
    primaryColor="#f3f3f3"
    secondaryColor="#ecebeb"
  >
    <rect x="3" y="8" rx="4" ry="4" width="100" height="8" /> 
    <rect x="120" y="8" rx="4" ry="4" width="160" height="8" /> 
  </ContentLoader>
</div>)

export const TableSkeleton = ()=>(<div style={{height:500}}>
  	<ContentLoader 
      width={500}
      speed={2}
      primaryColor="#f3f3f3"
      secondaryColor="#ecebeb"
    >
      <rect x="0" y="10" rx="4" ry="4" width="100%" height="15" /> 
      <rect x="0" y="35" rx="4" ry="4" width="100%" height="8" /> 
      <rect x="0" y="50" rx="4" ry="4" width="100%" height="8" /> 
      <rect x="0" y="65" rx="4" ry="4" width="100%" height="8" /> 
      <rect x="0" y="80" rx="4" ry="4" width="100%" height="8" />
    </ContentLoader>
</div>)