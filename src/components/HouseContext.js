import React,{useState,useEffect, createContext} from 'react';

import { housesData } from '../data';

export const HouseContext = createContext()


const HouseContextProvider = ({children}) => {
  const [houses, setHouses] = useState(housesData);
  const [country, setCountry] = useState('Location (any)');
  const [countries, setCountries] = useState([]);
  const [property, setProperty] = useState('Property type (any)');
  const [properties, setProperties] = useState([]);
  const [price, setPrice] = useState('Price Range (any)');
  const [loading, setLoading] = useState(false);
  const [year, setYear] = useState("Year (any)");
  const [years, setYears] = useState([]);
  
  
  //return all countries

  useEffect(() => {
    const allCountries = houses.map((house) =>{
      return house.country;
    });
    
    // remove duplicate
    const uniqueCountries = ['Location (any)', ... new Set(allCountries)]
    
    // set countries state
    setCountries(uniqueCountries);
  },[])

  // returning all properties
  useEffect(() => {
    const allProperties = houses.map((house) =>{
      return house.type;
    });
    
    // remove duplicate
    const uniqueProperty = ['Property (any)', ... new Set(allProperties)]
    
    // set property state
    setProperties(uniqueProperty);
  },[])

  // returning all years
  useEffect(() => {
    const allYears = houses.map((house) =>{
      return house.year;
    });
    
    // remove duplicate
    const uniqueYears = ['Year (any)', ... new Set(allYears)]
    
    // set year state
    setYears(uniqueYears);
  },[])

  const handleClick = () => {
    setLoading(true);
    

    const isDefault = (str) => {
      return str.split(' ').includes('(any)');
    };

    // price
    const minPrice = (parseInt(price.split(' ')[0]));
    const maxPrice = (parseInt(price.split(' ')[2]))
 

    const newHouses = housesData.filter((house) => {
       const housePrice = parseInt(house.price);
        // if all filter are used 1
       if(
        house.country === country && 
        house.type === property && 
        housePrice >= minPrice && 
        housePrice <= maxPrice &&
        house.year === year )
        {
        return house
       }
       // if all default values 2

       if(isDefault(country) && isDefault(property) && isDefault(price) && isDefault(year)){
        return house;
       }

       // if country is not default 3
       if(!isDefault(country) && isDefault(property) && isDefault(price) && isDefault(year)){
        return house.country === country ;
       }

       // if property is not default 4
       if(isDefault(country) && !isDefault(property) && isDefault(price) && isDefault(year)){
        return house.type === property ;
       }

       // if price is not default 5
       if(isDefault(country) && isDefault(property) && !isDefault(price) && isDefault(year)){
        if (housePrice >= minPrice && housePrice <= maxPrice ){
          return house;
        }
       }
       // if year is not default 6
       if(isDefault(country) && isDefault(property) && isDefault(price) && !isDefault(year)){
        return house.year === year ;
       } 

       // if country & property is not default 7
       if(!isDefault(country) && !isDefault(property) && isDefault(price) && isDefault(year)){
        return house.type === property && house.country === country;
       }

       // if country and price is not default 8
       if(!isDefault(country) && isDefault(property) && !isDefault(price) && isDefault(year)){
        if (housePrice >= minPrice && housePrice <= maxPrice ){
          return house.country === country;
        }
      }
      
        // if property and price are not default 9
        if(isDefault(country) && !isDefault(property) && !isDefault(price) && isDefault(year)){
          if (housePrice >= minPrice && housePrice <= maxPrice ){
            return house.type === property;
          }
        }

        //if country,property and price are not default 10
        if(!isDefault(country) && !isDefault(property) && !isDefault(price) && isDefault(year)){
          if (housePrice >= minPrice && housePrice <= maxPrice ){
            return house.type === property && house.country === country;
          }
        }

        //if year  and price is not defult 11
        if(isDefault(country) && isDefault(property) && !isDefault(price) && !isDefault(year)){
          if (housePrice >= minPrice && housePrice <= maxPrice ){
            return house.year === year;
          }
        }

        // if year & property is not default 12
       if(isDefault(country) && !isDefault(property) && isDefault(price) && !isDefault(year)){
        return house.type === property && house.year === year;
       }

       //if year,property  and price is not defult 13
       if(isDefault(country) && !isDefault(property) && !isDefault(price) && !isDefault(year)){
        if (housePrice >= minPrice && housePrice <= maxPrice ){
          return house.year === year && house.type === property;
        }
      }

      // if year & country is not default 14
      if(!isDefault(country) && isDefault(property) && isDefault(price) && !isDefault(year)){
        return house.country === country && house.year === year;
       }

      //if year,country  and price is not defult 15
      if(!isDefault(country) && isDefault(property) && !isDefault(price) && !isDefault(year)){
        if (housePrice >= minPrice && housePrice <= maxPrice ){
          return house.year === year && house.country === country;
        }
      }
        // if Year Country Property are not default
      if(!isDefault(country) && !isDefault(property) && isDefault(price) && !isDefault(year)){
        return house.country === country && house.year === year && house.type === property;
       }
       
       


    });
      setTimeout(()=> {
        return newHouses.length < 1 ? setHouses([]) : setHouses(newHouses),
        setLoading(false);
      },1000)
    console.log(newHouses);

  };
  
  return (
  <HouseContext.Provider value={{
    country,setCountry,
    countries,
    property,setProperty,
    properties,
    price,setPrice,
    year,setYear,
    years, setYears,
    houses,
    loading,
    handleClick,
  }}>
    {children}
  </HouseContext.Provider>
  );
};

export default HouseContextProvider;
