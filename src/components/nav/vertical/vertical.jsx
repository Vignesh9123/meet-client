/***
*
*   VERTICAL NAV
*   Primary desktop navigation used inside the main app.
*
*   DOCS
*   https://docs.usegravity.app/gravity-web/components/nav
*
*   PROPS
*   items:[{ label: string, link: string, icon: string }] (array, required)
*
**********/

import React, { useContext } from "react";
import { NavLink } from 'react-router-dom';
import { Logo, Button, Icon, Tooltip, TooltipTrigger, TooltipContent, cn, AuthContext, useNavigate, useTranslation, User } from 'components/lib';

export function VerticalNav({ items }){
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  function renderItem(item){    

    return (
      // <Tooltip key={ item.label }>
      //   <TooltipTrigger asChild>

          <div>
          { item.link ? 
            <NavLink to={ item.link } 
              className={({ isActive }) => cn('flex items-center gap-3 rounded-xl text-slate-600 hover:text-slate-900 transition-colors md:w-full px-3 py-2', { ['bg-pink-50 text-pink-600 font-semibold']: isActive })}>
                <Icon name={ item.icon } size={ 18 } /> <span className="text-sm">{item.label}</span> {(item.link.includes('/inbox') && authContext?.unreadCount) ? <span><span className="font-bold text-green-500">
                ({authContext?.unreadCount})
                </span></span> : null}
            </NavLink> :
            <button onClick={ item.action } className={'flex items-center gap-3 rounded-xl text-slate-600 hover:text-slate-900 transition-colors md:w-full px-3 py-2'}>
              <Icon name={ item.icon } size={ 18 } /> <span className="text-sm">{item.label}</span>
            </button>
          }
          </div>

      //   </TooltipTrigger>
      //   <TooltipContent side='right'>{ item.label }</TooltipContent>
      // </Tooltip>
    )
  }

  return (
    <aside className='fixed pt-4 bg-white inset-y-0 left-0 z-10 hidden w-[208px] flex-col border-r sm:flex dark:bg-slate-900 dark:border-r-slate-800'>

      <Logo className='w-28 h-auto mb-6' color='dark'/>

      { /* top items */ }
      <nav className='flex flex-col gap-1 px-3 sm:py-2'>
        { items?.length > 0 &&
          items.map(item => {
            return item.position === 'top' ? renderItem(item) : false;
          })
        }
      </nav>

      {/* mini wallet card */}
      <div className='px-3 mt-4'>
        <div className='rounded-2xl p-4 text-white shadow-md relative overflow-hidden bg-gradient-to-br from-pink-500 via-rose-500 to-red-500'>
          <div className='text-[11px] opacity-90'>{t('dashboard.your_balance')}</div>
          <div className='mt-1 flex items-center gap-2 text-2xl font-extrabold'>
            <span>{authContext?.user?.accounts?.[0]?.virtual_currency ?? 0}</span>
            <span>❤️</span>
          </div>
          <button onClick={() => navigate('/account/billing?topup=1')} className='mt-3 w-full h-8 rounded-full bg-white text-pink-600 text-xs font-semibold hover:bg-white/90 transition-colors'>
            {t('dashboard.topup_now')}
          </button>
        </div>
      </div>

      {/* profile/coins card (removed to avoid duplication) */}

      {/* bottom items + profile */}
      <div className='mt-auto'>
        <nav className={ cn('flex flex-col gap-1 px-3 sm:py-4') }>
          { items?.length > 0 &&
            items.map(item => {
              return item.position === 'bottom' ? renderItem(item) : false;
            })
          }
        </nav>

        {/* profile quick link */}
        <div className='px-3 pb-4'>
          <div className='flex items-center gap-3 p-3 rounded-xl border border-slate-200'>
            <User />
            <div className='flex flex-col'>
              <div className='text-sm font-semibold'>{authContext?.user?.name}</div>
              <button className='text-xs text-pink-600 hover:underline text-left' onClick={() => navigate('/account/profile')}>
                {t('account.coins.edit_profile')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}
