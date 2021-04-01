import {useEffect} from 'react';

  export const infiniteCallback=(data,countries,num)=>{
    if(num+50<=countries){
      data=countries.slice(0,countries.length);
    }
    else{
      data=countries.slice(0,num);
      num=num+50;
    }
  }

  export const useInfiniteScroll=({
    root=null,
    target,
    onIntersect,
    treshold=1.0,
    rootMargin='0px',
  })=>{
    useEffect(()=>{
        if(!target){
            return;
        };

        const observer =new IntersectionObserver(onIntersect,{
            root,
            rootMargin,
            treshold,
        });

        observer.observe(target);
    return()=>{
            observer.unobserve(target);
        }
    },[target,root,rootMargin,onIntersect,treshold]);
  }