import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { GetPathObjByPathName } from 'Navigation';

export default function useCurrentPath() {
  const location = useLocation();
  const [pathObject, setPathObject] = useState({});

  useEffect(() => {
    const { pathname } = location;
    setPathObject(GetPathObjByPathName(pathname));
  }, [location]);

  return pathObject;
}
