import React, { useEffect, useState } from 'react'
import { useAuth } from '../../Authentication/AuthContext';
import { useNavigate } from 'react-router-dom';

//To get the only changed prices
const getChangedPlans01 = (original, updated) => {
  let changes = [];
  updated.forEach((plan, planIndex) => {
    // Use the appropriate key depending on the plan type
    const key = plan.regular ? 'regular' : 'special';
    const updatedItems = plan[key];
    const originalItems = original[planIndex][key];
    
    updatedItems.forEach((item, idx) => {
      if (item.price !== originalItems[idx].price) {
        changes.push({
          title: plan.title,
          time: item.time,
          newPrice: item.price, // if you need to transform this value, do it here
          type_id: plan.title.toLowerCase().includes("regular") ? 1 : 2
        });
      }
    });
  });
  return changes;
};


export const MenuPlanPannel = ({ Plan, isAllMenuPriceSetToZero }) => {
    // Find the plans while keeping the title
    const [Subscription, setSubscription] = useState(Plan?.filter(item => item.regular || item.special))
    const [backUpSubscription, setBackUpSubscription] = useState([]);
    // const Subscription = Plan.filter(item => item.regular || item.special);

    const [isEdit, setIsEdit] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const [changedPlans, setChangedPlans] = useState([]);

    const [isFistTimeVisitor, setIsFistTimeVisitor] = useState(isAllMenuPriceSetToZero);
    const {user , PriceUpdate} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
      setSubscription(Plan?.filter(item => item.regular || item.special));
    }, [Plan]);

    const invalidFound = Subscription?.some(plan => {
      const items = plan.regular || plan.special;
      return items?.some(item => {
        const price = parseFloat(item.price);
        return item.price === null || isNaN(price) || price < 1;
      });
    });

    const onChange = (e, index , idx) => {
            setSubscription( preState => {
                const newSubscription = [...preState];
                const plan = newSubscription[index];
                const item = plan.regular ? plan.regular[idx] : plan.special[idx];
                item.price = e.target.value === "" ? 0.00 : parseInt(e.target.value);
                return newSubscription;
            }
        );
    }

    const getChangedPlans = () => {
        if (!backUpSubscription.length) return [];
        return Subscription?.map((plan, planIndex) => {
          const type = plan.regular ? "regular" : "special";
          const backupPlan = backUpSubscription[planIndex];
          const changedItems = plan[type].filter((item, idx) => {
            return backupPlan[type] &&
                   backupPlan[type][idx] &&
                   backupPlan[type][idx].price != item.price;
          });
          return changedItems.length > 0
            ? { title: plan.title, type, changedItems }
            : null;
        }).filter(plan => plan !== null);
      };

    const EnableEditMode = () => {
    const newBackup = JSON.parse(JSON.stringify(Subscription)); // local backup
    setBackUpSubscription(newBackup);
    setIsEdit(true);
    };

    const CancelChanges = () => {
        setIsEdit(false);
        setIsUpdate(false);
        setSubscription(backUpSubscription);
    }
    const UpdateChanges = async (e) => {
      e.preventDefault();
      if (invalidFound) {
        alert("All input should be greater than or equal to 1 rupee");
        return; // Abort the update if validation fails
      }
      const initialSubscription = JSON.parse(localStorage.getItem('menuPlanData'));
      const originalSubscriptionBackup = JSON.parse(JSON.stringify(initialSubscription));

      const changedPlans = getChangedPlans01(originalSubscriptionBackup, Subscription);

      setIsEdit(false);
      setIsUpdate(false);
      // setIsFistTimeVisitor(false);

      if(!(changedPlans.length > 0)){
        console.log("Nothing is changed.")
        return;
      }

      await PriceUpdate(changedPlans , user.id, user.username);
      alert("Updated Successfully");
      };


      const CreatePlan = async (e) => {
        e.preventDefault();
        if (invalidFound) {
          alert("All input should be greater than or equal to 1 rupee");
          return; // Abort the update if validation fails
        }
        const initialSubscription = JSON.parse(localStorage.getItem('menuPlanData'));
        const originalSubscriptionBackup = JSON.parse(JSON.stringify(initialSubscription));

        const changedPlans = getChangedPlans01(originalSubscriptionBackup, Subscription);

        // setIsEdit(false);
        // setIsUpdate(false);
        setIsFistTimeVisitor(false);

        if(!(changedPlans.length > 0)){
          console.log("Nothing is changed.")
          return;
        }

        await PriceUpdate(changedPlans , user.id, user.username);
        alert("Updated Successfully");

        navigate('/customer-page');
      }

      // const CreatePlan = () => {

      //   if (invalidFound) {
      //     alert("All input should be greater than or equal to 1 rupee");
      //     return; // Abort the update if validation fails
      //   }

      //   setIsEdit(false);
      //   setIsUpdate(false);
      //   setIsFistTimeVisitor(false);
      //   console.log("User Id is:",user.id);
      //   alert("Updated Successfully");
      // };

      // Use useEffect to update localStorage when isFistTimeVisitor changes
      useEffect(() => {
        localStorage.setItem("isAllMenuPriceSetToZero", JSON.stringify(isFistTimeVisitor));
      }, [isFistTimeVisitor]); 

      const isUpdateClicked = () => {
        if (invalidFound) {
          alert("All input should be greater than or equal to 1 rupee");
          return; // Abort the update if validation fails
        }
        setChangedPlans(getChangedPlans());
        setIsUpdate(true);
      };

    return (
        <>
            {Subscription?.map((plan, index) => (
                <div key={index} className={`bg-[#266E73] text-[#C6ECCF] ${index === 0 ? `mt-14` : `mt-6`} mx-2 rounded-3xl`}>
                    <div className='p-5 font-light text-lg'>
                        {/* Title */}
                        <div className='mt-5 border-b-[1px] pb-2 border-[#C6ECCF]'>
                            <p>{plan.title}</p>
                        </div>

                        <div className='grid grid-cols-2 mt-5'>
                            {/* Times */}
                            <div>
                                { (plan.regular || plan.special).map((item, idx) => 
                                  <p key={idx} className={`${(isEdit || isFistTimeVisitor) && `mt-2 font-normal`}`}>{item.time}</p>
                                )}
                            </div>

                            {/* Prices */}
                            <div className='overflow-x-auto'>
                            { (plan.regular || plan.special).map((item, idx) => {
                                    return isFistTimeVisitor ? (
                                      <p key={idx} className='bg-white rounded-xl mt-1 text-[#266E73]'>
                                        <span className='ml-2'>Rs:</span>
                                        <input
                                          type='number'
                                          min="0"
                                          autoFocus={isFistTimeVisitor && item.time === 'Three times a day'} // Auto-focus when isFistTimeVisitor is true
                                          onChange={(e) => onChange(e, index, idx)}
                                          className='w-[77%] placeholder:font-normal font-normal rounded-xl outline-none pt-1 pl-1'
                                          placeholder={parseInt(item.price)}
                                        />
                                      </p>
                                    ) : (
                                      isEdit ? (
                                        <p key={idx} className='bg-white rounded-xl mt-1 text-[#266E73]'>
                                          <span className='ml-2'>Rs:</span>
                                          <input
                                            type='number'
                                            min="0"
                                            onChange={(e) => onChange(e, index, idx)}
                                            className='w-[77%] placeholder:font-normal font-normal rounded-xl outline-none pt-1 pl-1'
                                            placeholder={parseInt(item.price)}
                                          />
                                        </p>
                                      ) : (
                                        <p className='ml-10' key={idx}>
                                          Rs: {parseFloat(item.price).toFixed(2)}
                                        </p>
                                      )
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            <div className='w-ful mt-3 text-white text-xl font-light  mb-16'>
                <div className='mx-2  grid grid-cols-2'>
                      { !isFistTimeVisitor ? <><button onClick={isEdit ? CancelChanges : EnableEditMode } className={`${!isEdit && `text-[#C6ECCF]`} rounded-3xl py-3 px-5 bg-[#266E73] mr-10`}> {isEdit ? "Cancel" : "Edit"} </button>
                    {isEdit &&  
                        <button 
                            onClick={ isUpdateClicked } 
                            className='py-3 rounded-3xl px-5 bg-[#266E73] ml-10'> 
                            Update 
                        </button>
                    } </> : isFistTimeVisitor &&  
                      <button 
                          onClick={ CreatePlan } 
                          className='py-3 rounded-3xl px-5 bg-[#266E73]'> 
                          ok 
                      </button>
                  }
                </div>
            </div>
            {isUpdate && (
            <div className='absolute left-0 top-0 bg-gray-800 bg-opacity-45 w-full h-screen flex flex-col'>
                        <div onClick={CancelChanges} className=' w-full h-full top-10  flex justify-center items-center'>
                        <div onClick={(e) => e.stopPropagation()} className='bg-[#C6ECCF] p-10 rounded-3xl border-2 border-[#266E73] shadow-md shadow-black'>
                  {changedPlans.length > 0 ? (
                    changedPlans.map((plan, planIndex) => (
                      <div key={planIndex} className={`${planIndex === 0 ? "mt-0" : "mt-10"}`}>
                        <p className='border-b-[1px] border-[#266E73] text-xl'>{plan.title}</p>
                        <div className='grid grid-cols-2 gap-9 mt-5'>
                          <div>
                            {plan.changedItems.map((item, idx) => (
                              <p key={idx}>{item.time}</p>
                            ))}
                          </div>
                          <div className='ml-5'>
                            {plan.changedItems.map((item, idx) => (
                              <p key={idx}>Rs: {parseFloat(item.price ).toFixed(2)}</p>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>No changes made.</p>
                  )}
                  <p className='text-red-500 mt-5'>Are you sure you want to update?</p>
                  <div className='w-full flex justify-between mt-5'>
                    {["No", "Yes"].map((btnLabel, idx) => (
                      <button
                        key={idx}
                        onClick={idx === 0 ? CancelChanges : UpdateChanges}
                        className={`py-3 px-11 ${idx === 0 ? "bg-[#e36767]" : "bg-[#329097]"} hover:outline outline-2 outline-white outline-offset-[-2px] rounded-xl`}
                      >
                        {btnLabel}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
    );
};
