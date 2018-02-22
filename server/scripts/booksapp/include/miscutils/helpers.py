import hashlib
import json
from collections import namedtuple
from datetime import datetime
from decimal import Decimal


class BooksHelpers(object):

    @staticmethod
    def json2object(data):
        return json.loads(data, object_hook=lambda d: namedtuple('X', d.keys())(*d.values()))

    @staticmethod
    def hash_string(string_to_hash):
        correct_string = str(string_to_hash)
        encoded_string = correct_string.encode('utf-8')
        hashed_object = hashlib.sha1(encoded_string)
        return hashed_object.hexdigest()

    @staticmethod
    def base_auth_checks(user_data, response, admin_check=False):
        # Если ошибка в БД
        user_error = user_data['user_error']
        if user_error is True:
            return response({
                'success': False,
                'message': 'Произошла непредвиденная ошибка'
            })

        # Если не авторизованы
        user_info = user_data['user']
        if user_info is False:
            return response({
                'success': False,
                'message': 'Неизвестная ошибка',
                'data': {
                    'errorCode': 'NOT_AUTH'
                }
            })

        # Если пользователь не админ
        if admin_check:
            if user_info.user_is_admin != 'yes':
                return response({
                    'success': False,
                    'message': 'Неизвестная ошибка',
                    'data': {
                        'errorCode': 'ACCESS_DENIED'
                    }
                })

        # Если все ок
        return None

    @staticmethod
    def generate_secret_key():
        time_date = datetime.utcnow() - datetime(1970, 1, 1)
        timestamp_microseconds = (time_date.days * 86400 + time_date.seconds) * 10 ** 6 + time_date.microseconds
        return Decimal(timestamp_microseconds).scaleb(-6)
