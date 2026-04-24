import { useState } from 'react';
import CommandPalette, {
  filterItems, getItemIndex, JsonStructure,
  useHandleOpenCommandPalette,
} from 'react-cmdk';
import { useDispatch, useSelector } from 'react-redux';
import { setIsOpenPallet } from '~/redux/slices/CMDKSlice';
import { RootState } from '~/redux/store';
import './styles.scss';

const CMDK = ({ itemList } : { itemList: JsonStructure }) => {
  const [page] = useState<'root' | 'projects'>('root');
  const isOpen = useSelector((state: RootState) => state.CMDK.isOpen);
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();
  const filteredItems = filterItems(
    itemList,
    search,
  );

  useHandleOpenCommandPalette((values: any) => dispatch(setIsOpenPallet(values())));

  return (
    <CommandPalette
      onChangeSearch={setSearch}
      onChangeOpen={() => dispatch(setIsOpenPallet(false))}
      search={search}
      isOpen={isOpen}
      page={page}
    >
      <CommandPalette.Page id="root">
        {filteredItems.length ? (
          filteredItems.map((list) => (
            <CommandPalette.List key={list.id} heading={list.heading}>
              {list.items.map(({ id, ...rest }) => (
                <CommandPalette.ListItem
                  key={id}
                  index={getItemIndex(filteredItems, id)}
                  {...rest}
                />
              ))}
            </CommandPalette.List>
          ))
        ) : (
          <CommandPalette.FreeSearchAction />
        )}
      </CommandPalette.Page>

    </CommandPalette>
  );
};

export default CMDK;
