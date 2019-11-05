const state = {
  funds: 10000,
  stocks: []
}

const mutations = {
  'BUY_STOCK'(state, { stockId, stockPrice, quantity}) {
    const record = state.stocks.find(stock => stock.id == stockId);
    console.log('Quantity', quantity, stockId, stockPrice, record)
    if (record) {
      record.quantity += quantity;
    } else {
      state.stocks.push({
        id: stockId,
        quantity: quantity
      });
    }
    state.funds -= quantity * stockPrice;
  },
  'SELL_STOCK'(state, { stockId, stockPrice, quantity}) {
    const record = state.stocks.find(stock => stockId == stock.id);
    if (record.quantity > quantity) {
      record.quantity -= quantity;
    } else {
      state.stocks.splice(record, 1);
    }

    state.funds += quantity * stockPrice;
  },
  'SET_PORTFOLIO'(state, { stockPortfolio, funds}) {
    state.funds = funds;
    state.stocks = stockPortfolio ? stockPortfolio : [];
  }
}

const actions = {
  'sellStock'({commit}, order) {
    commit('SELL_STOCK', order);
  }
}

const getters = {
  stockPortfolio(state, getters) {
    return state.stocks.map(stock => {
      const record = getters.stocks.find(element => element.id === stock.id);
      return {
        id: stock.id,
        quantity: stock.quantity,
        price: record.price,
        name: record.name
      }
    })
  },
  funds(state) {
    return state.funds;
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}