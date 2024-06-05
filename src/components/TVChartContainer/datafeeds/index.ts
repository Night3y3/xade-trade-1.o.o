/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */

export const supportedResolutions = [
  "1",
  "5",
  "15",
  "30",
  "60",
  "120",
  "240",
  "24H",
  "7D",
  "30D",
];

const lastBarsCache = new Map();
export const Datafeed = (baseAsset: any) => ({
  onReady: (callback: Function) => {
    callback({ supported_resolutions: supportedResolutions });
  },
  resolveSymbol: (symbolName: string, onResolve: Function) => {
    const params = {
      name: symbolName,
      description: "",
      type: "crypto",
      session: "24x7",
      ticker: symbolName,
      minmov: 1,
      pricescale: Math.min(
        10 ** String(Math.round(10000 / baseAsset.price)).length,
        10000000000000000
      ),
      has_intraday: true,
      intraday_multipliers: ["1", "15", "30", "60"],
      supported_resolution: supportedResolutions,
      volume_precision: 8,
      data_status: "streaming",
    };
    onResolve(params);
  },
  getBars: async (
    symbolInfo: any,
    resolution: string,
    periodParams: {
      from: number;
      to: number;
      countBack: any;
      firstDataRequest: any;
    },
    onResult: Function
  ) => {
    const response = await fetch("/api/1/market/history/pair", {
      body: JSON.stringify({
        asset: baseAsset.contracts[0],
        blockchain: baseAsset.blockchains[0],
        from: periodParams.from * 1000,
        to: periodParams.to * 1000,
        amount: periodParams.countBack,
        usd: true,
        period: resolution,
      }),
      headers: { Authorization: "YOUR-API-KEY" },
    });
    const data = await response.json();

    onResult(data.data, {
      noData: data.data.length !== periodParams.countBack,
    });

    if (periodParams.firstDataRequest) {
      lastBarsCache.set(baseAsset.name, data.data[data.data.length - 1]);
    }
  },
  searchSymbols: () => {},
  subscribeBars: () => {},
  unsubscribeBars: () => {},
  getMarks: () => ({}),
  getTimeScaleMarks: () => ({}),
  getServerTime: () => ({}),
});