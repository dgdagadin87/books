import hashlib

class BooksHelpers(object):

    @staticmethod
    def hash_string(string_to_hash):
        correct_string = str(string_to_hash)
        encoded_string = correct_string.encode('utf-8')
        hashed_object = hashlib.sha1(encoded_string)
        return hashed_object.hexdigest()


