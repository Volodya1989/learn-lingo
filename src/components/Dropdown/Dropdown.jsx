import { useState, useRef } from 'react';

import {
  DropdownContainer,
  DropdownBtn,
  DropdownList,
  DropdownItem,
  DropdownDescr,
} from './Dropdown.styled';
import { GoChevronDown } from 'react-icons/go';
import useOnClickOutside from 'hooks/useOnClickOutside';

const Dropdown = ({ dropdownName, selectedName, handleClick, itemsMap }) => {
  const [isDropdown, setIsDropdown] = useState(false);
  const toggleDropdown = () => {
    setIsDropdown(!isDropdown);
  };

  const innerWrapperRef = useRef();

  //closing sorting options based on the click outside of the sorting box
  useOnClickOutside(
    innerWrapperRef,
    () => isDropdown && setTimeout(() => setIsDropdown(false), 201)
  );
  return (
    <DropdownContainer onClick={() => toggleDropdown()}>
      <DropdownDescr>{dropdownName}</DropdownDescr>
      <DropdownBtn>
        <span>{selectedName}</span>
        <GoChevronDown
          size={20}
          color={'black'}
          style={isDropdown ? { transform: 'rotate(180deg)' } : ''}
        />
      </DropdownBtn>{' '}
      {isDropdown ? (
        <div>
          <DropdownList ref={innerWrapperRef}>
            <DropdownItem
              style={{
                color: `${selectedName === 'All' ? 'black' : '#8a8a89'}`,
              }}
              onClick={() => handleClick('All')}
            >
              All
            </DropdownItem>

            {itemsMap?.map((item, index) => {
              console.log(item);
              return (
                <DropdownItem
                  style={{
                    color: `${selectedName === item ? 'black' : '#8a8a89'}`,
                  }}
                  onClick={() => handleClick(item)}
                  key={index}
                >
                  {item}
                </DropdownItem>
              );
            })}
          </DropdownList>
        </div>
      ) : (
        false
      )}
    </DropdownContainer>
  );
};
export default Dropdown;