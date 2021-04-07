import {useEffect} from 'react';

const useInfiniteScroll=({
    root=null,
    target,
    onIntersect,
    threshold=1,
    rootMargin='0px',
  })=>{
    useEffect(()=>{
      if(!target){
        return;
    }
        const observer =new IntersectionObserver(onIntersect,{
            root,
            rootMargin,
            threshold,
        })

        observer.observe(target);
        return()=>{
            observer.disconnect();
        }
    },[target,root,rootMargin,onIntersect,threshold]);
  }

  export default useInfiniteScroll;