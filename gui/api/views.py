import os
import glob
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.files.storage import FileSystemStorage
from .scripts import holt_winters as hw
import warnings

warnings.filterwarnings('ignore')

filedir = "cache/temp.csv"


@csrf_exempt
def upload(request):
    if request.method == 'POST':
        ################################
        # 1. Saving File CSV to Cache
        ################################

        files = glob.glob('cache/*')
        for f in files:
            try:
                print(f)
                os.remove(f)

            except:
                print("0 Deleted Cache")

        data = request.FILES['inputDataset']

        fs = FileSystemStorage()

        fs.save('temp.csv', data)

        return JsonResponse({
            'status': 'success'
        })

    return JsonResponse({
        'status': 'failed'
    })


@csrf_exempt
def holtWinters(request):
    if request.method == 'POST':
        # Variable saving
        trend, season = request.POST['trend'], request.POST['season']
        alpha, beta, gamma = float(request.POST['alpha']), float(request.POST['beta']), float(request.POST['gamma'])
        peramalan = int(request.POST['peramalan'])

        # Loading File CSV
        data = hw.load_file()

        # Getting Length of data
        length = len(data)

        # Object to DateTime Index
        data = hw.convert_datetime(data)

        # First column
        target_data = data.iloc[:, 0]

        # Holt-Winters Model
        fitted = hw.holtwinters(target_data, trend, season, alpha, beta, gamma)

        # Fitted Data
        fitted_data = hw.forecast(fitted, length - 1, 0)

        # Calculate MAPE
        mape = hw.calculate_mape(target_data, fitted_data)

        aktual = packPayload(target_data.to_list(), target_data.index.to_list())

        # Forecasting
        if peramalan != 0:
            result = hw.forecast(fitted, length - 1, peramalan)
            prediksi = packPayload(result.to_list(), result.index.to_list())
        else:
            prediksi = aktual

        payload = {
            'title': data.columns.values[0].replace('_', ' '),
            'mape': mape,
            'aktual': aktual,
            'prediksi': prediksi
        }

        return JsonResponse(payload)


@csrf_exempt
def viewOnly(request):
    if request.method == 'POST':
        # Loading File CSV
        data = hw.load_file()

        # Object to DateTime Index
        data = hw.convert_datetime(data)

        target_data = data.iloc[:, 0]

        content = packPayload(target_data.to_list(), target_data.index.to_list())

        payload = {
            'title': data.columns.values[0].replace('_', ' '),
            'data': content
        }

        return JsonResponse(payload)


def packPayload(value, date):
    temp = []

    for i in range(len(value)):
        temp.append({
            'x': int(date[i].to_pydatetime().timestamp() * 1000),
            'y': value[i]
        })

    return temp
