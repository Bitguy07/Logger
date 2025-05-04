import React from 'react'
import Header from './Header'
import {MenuPlanPannel} from '../SmallComponents/MenuPlanPannel'
import { useAuth } from '../../Authentication/AuthContext'

    // const menuData = JSON.parse(localStorage.getItem('menuPlanData'));


    const MenuSettingPannel = () => {
        // const transformedSubscription = transformResponseData(menuData);
        const {menuPlanData} = useAuth();
    
        let isAllMenuPriceSetToZero = JSON.parse(localStorage.getItem("isAllMenuPriceSetToZero"));
    
        if (isAllMenuPriceSetToZero === null) {
            const storedData = menuPlanData || [];
            
            isAllMenuPriceSetToZero = storedData.some(plan => 
                (plan.regular && plan.regular.some(item => item.price === 0 || item.price === "0.00" || item.price === null)) ||
                (plan.special && plan.special.some(item => item.price === 0 || item.price === "0.00" || item.price === null))
            );
            
        }
      return (
        <div className='relative h-full w-full sm:max-w-3xl '>
            <div className='absolute top-0 left-0 w-full h-dvh scrollable-element overflow-y-scroll  flex flex-col bg-[#C6ECCF]'>
                <Header title = {{ type : "title", Title: "Menu Settings " }} />
                <MenuPlanPannel Plan = {menuPlanData} isAllMenuPriceSetToZero = {isAllMenuPriceSetToZero} />
            </div>
        </div>
      )
    }
export default MenuSettingPannel