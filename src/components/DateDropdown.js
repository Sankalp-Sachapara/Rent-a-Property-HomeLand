import React ,{ useState,useEffect, useContext } from 'react';

import {RiCalendar2Line, RiArrowDownSLine, RiArrowUpSLine} from 'react-icons/ri'

import { Menu } from '@headlessui/react'

import { HouseContext } from './HouseContext';

const DateDropdown = () => {
  const {year, setYear, years} = useContext(HouseContext);
  
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Menu as='div' className='dropdown relative'>
      <Menu.Button onClick = { () => setIsOpen(!isOpen)} className='dropdown-btn w-full text-left'>
        <RiCalendar2Line className='dropdown-icon-primary' />
        <div>
          <div className='text-[15px] font-medium leading-tight'>{year}</div>
          <div className='text-[13px]'>Select by year</div>
          </div>
          {
            isOpen ? (
              <RiArrowUpSLine className='dropdown-icon-secondry' />
            ) : (
              <RiArrowDownSLine className='dropdown-icon-secondary' />  
            )
          }
      </Menu.Button>

      <Menu.Items className='dropdown-menu'>
        {years.map((year, index) => {
          return (
            <Menu.Item 
            onClick={() => setYear(year)}
            className='cursor-pointer hover:text-violet-700 transition' 
            as='li' 
            key={index}>

              {year}

            </Menu.Item>
          )
        })}
      </Menu.Items>
    </Menu>
);
};

export default DateDropdown;

