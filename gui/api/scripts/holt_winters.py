from statsmodels.tsa.holtwinters import ExponentialSmoothing as HWES
import pandas as pd
import numpy as np

filedir = 'cache/temp.csv'


def load_file():
    return pd.read_csv(filedir)


def convert_datetime(data):
    length = len(data)
    dateIndex = pd.date_range(data['Tanggal'][0], freq="D", periods=length)
    data.index = pd.Index(dateIndex)

    return data.drop(['Tanggal'], axis=1)


def holtwinters(data, trend_params, seasonal_params, alpha, beta, gamma):
    """
    :param trend_params: parameter trend, mul atau add
    :param seasonal_params: parameter seasonal, mul atau add
    :param data: dataframe covid
    :param case: kasus yang dipilih misal Kasus_Positif
    :return: model holt winters
    """
    hwes = HWES(data,
                trend=trend_params,
                seasonal=seasonal_params,
                seasonal_periods=7)

    return hwes.fit(optimized=False,
                    smoothing_level=alpha,
                    smoothing_trend=beta,
                    smoothing_seasonal=gamma)


def calculate_mape(data, predict):
    return np.mean(np.abs((data - predict) / data)) * 100


def forecast(fitted_hw, length, day):
    return fitted_hw.predict(start=0, end=length+day)
