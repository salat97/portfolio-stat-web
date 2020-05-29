import React, { useEffect } from 'react';
import { format, parseISO } from 'date-fns';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';

import HomeView from './HomeView';
import useStore from '../../hooks/useStore';
import ColorProvider from '../../contexts/ColorContext';

const formatDate = (date: Date | undefined) =>
    !!date ? format(date, 'dd.MM.yyyy HH:mm') : '-';

const HomeContainer = () => {
    const {
        analiticStore: {
            getFirstTrade,
            getLastTrade,
            getTradesByMonth,
            firstTrade,
            lastTrade,
            totalValue,
            tradeByMonth,
            currenciesState
        },
        transactionStore: { transactions },
        userStore: { currency }
    } = useStore();

    useEffect(() => {
        getFirstTrade();
        getLastTrade();
        getTradesByMonth();
    }, []);

    const balance = Object.keys(currenciesState).map(key => ({
        name: key,
        value: Math.round(currenciesState[key].byCurr)
    }));

    const curByValue = balance.filter(cur => cur.value > 0);

    const curSymbol = currency?.symbol || '';

    const currValue = Object.keys(currenciesState).map(key => ({
        ...currenciesState[key],
        symbol: key
    }));

    const tradesPerMonth = toJS(tradeByMonth).map(({ date, number }) => ({
        name: format(parseISO(date), 'dd.MM.yyyy'),
        value: number
    }));

    return (
        <ColorProvider keys={Object.keys(currenciesState)}>
            <HomeView
                totalValue={`${Math.round(totalValue)} ${curSymbol}`}
                firstTrade={formatDate(firstTrade)}
                lastTrade={formatDate(lastTrade)}
                totalTrades={transactions?.length}
                curByValue={curByValue}
                currency={curSymbol}
                currValue={currValue}
                balance={balance}
                tradesPerMonth={tradesPerMonth}
            />
        </ColorProvider>
    );
};

export default observer(HomeContainer);
