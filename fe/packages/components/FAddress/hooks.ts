import {
  RefObject, useEffect, useRef, useState,
} from 'react';

import { LocalStorageCache } from '@packages/utils/cacheManager';
import { AnyObject } from 'antd/lib/_util/type';
import { locationFormatSlugtify } from './location';
import { ICode, IProvince } from './types';

export const CacheAddress = new LocalStorageCache('address');

/**
 *
 * @param element : DOM element
 * @param rootMargin : Space to display DOM call api
 * @returns : Boolean
 */
export const useObserver = (element: RefObject<HTMLDivElement> | null, rootMargin: number) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const isFirstRenderRef = useRef(true);

  useEffect(() => {
    /**
     * Tìm điểm giao nhau giữa phần tử HTML và Viewport của trình duyệt
     * Nó sẽ theo dõi phần tử HTML được hiện thị trong DOM
    */
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && isFirstRenderRef.current) {
          setIsVisible(entry.isIntersecting);
          isFirstRenderRef.current = false;
        }
      },
      { rootMargin: `${rootMargin}px` },
    );

    if (element?.current) observer.observe(element?.current);

    return () => {
      if (element?.current) observer.unobserve(element.current);
    };
  }, [element, rootMargin]);

  return isVisible;
};

export const useAddress = (
  element: RefObject<HTMLDivElement> | null,
  disabledCurrentLocation = true,
): [IProvince[], string[]] => {
  const isVisible = useObserver(element, 0);
  const [address, setAddress] = useState<IProvince[]>([]);
  const [locations, setLocations] = useState<string[]>([]);

  useEffect(() => {
    // TODO: Fetch provinces/districts/ward
    const fetchAddress = async (fileName: string) => {
      try {
        const response = await fetch(`https://raw.githubusercontent.com/fint-software/provinces/main/json/${fileName}`);

        return await response.json();
      } catch (error) {
        console.error(error);
      }
    };

    // TODO: Fetch location current user
    const fetchLocation = async () => {
      try {
        const position: AnyObject = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });
        const { latitude, longitude } = position.coords;
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`);
        const data = await response.json();
        const locationCurrent = locationFormatSlugtify(data.address);

        return locationCurrent;
      } catch (error) {
        console.error('Error fetching or processing location:', error);
        return null;
      }
    };

    // TODO: Fetch all
    const fetchAll = async () => {
      const [provinces, districts, wards, _location] = await Promise.all([
        fetchAddress('provinces.json'),
        fetchAddress('districts.json'),
        fetchAddress('wards.json'),
        disabledCurrentLocation ? null : fetchLocation(),
      ]);

      if (_location) setLocations(_location);

      if (CacheAddress.getCache()) {
        setAddress(CacheAddress.getCache());
        return;
      }

      if (provinces && districts && wards) {
        const customProvinces = provinces.map((pro: ICode) => {
          const replaceProvinceName: string = pro.code_name.replace('thanh_pho_', '').replace('tinh_', '');

          return {
            label: pro.name,
            value: replaceProvinceName,
            districts: districts[pro.code_name].districts.map((dis: ICode) => ({
              label: dis.name,
              value: dis.short_code_name,
              wards: wards[dis.code_name].wards.map((ward: ICode) => ({
                label: ward.name,
                value: ward.short_code_name,
              })),
            })),
          };
        });
        setAddress(customProvinces);
        CacheAddress.putCache(customProvinces);
      }
    };

    // TODO: Check DOM call API
    fetchAll();
  }, [isVisible]);

  return [address, locations];
};
