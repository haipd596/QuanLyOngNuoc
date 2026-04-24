import { cmdIcon } from '@packages/assets/icons';
import { useLanguage } from '@packages/components/LanguageContext';
import { useOperatingSystem } from '@packages/hooks/useOperatingSystem';
import React from 'react';
import { useDispatch } from 'react-redux';
import { setSearchValue } from '~/redux/slices';
import { togglePallet } from '~/redux/slices/CMDKSlice';
import './style.scss';

const SearchBox: React.FC = () => {
  // Connect Component to Redux
  const dispatch = useDispatch();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    dispatch(setSearchValue(searchValue));
  };
  const { translate } = useLanguage();

  const userOS = useOperatingSystem();

  const handleClickCMDK = () => {
    dispatch(togglePallet());
  };

  return (
    <div className="search-box" onClick={handleClickCMDK}>
      <span className="search-box__icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="15"
          height="15"
          fill="none"
        >
          <path
            fill="currentColor"
            d="m14.5 13.793-3.776-3.776a5.508 5.508 0 1 0-.707.707l3.776 3.776.707-.707ZM2 6.5a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0Z"
          />
        </svg>
      </span>
      <input onChange={handleSearch} type="text" placeholder={translate('search_placeholder')} />
      <span className={`cmdk-icon ${userOS === 'MacOS' ? 'MacOS' : 'windows'}`}>
        {userOS === 'MacOS' ? <img src={cmdIcon} alt="command" /> : (<span>CTRL</span>)}
        K
      </span>
    </div>
  );
};

export default SearchBox;
