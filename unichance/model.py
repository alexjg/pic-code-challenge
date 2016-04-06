
class Model(object):

    def __init__(self, data):
        self.data = data

    def predict(self, sex, ethnicity):
        eth_data = self.data[self.data["Ethnic Group (Summary Level) "].str.lower() == ethnicity]
        sex_data = eth_data[eth_data[" Sex"].str.lower() == sex]
        mean = sex_data.mean()
        return mean["Number of Acceptances"]/mean["Number of Applicants"]
