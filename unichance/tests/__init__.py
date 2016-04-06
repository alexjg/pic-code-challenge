from unichance.handlers import app
import unittest
from unittest import mock
import marshmallow
import json


class FetchProbabilityViewTestCase(unittest.TestCase):

    def setUp(self):
        app.config["TESTING"] = True
        self.app = app.test_client()

        self.serializer_patcher = mock.patch(
            "unichance.handlers.AcceptanceRequestSerializer")
        self.mock_serializer_cons = self.serializer_patcher.start()
        self.addCleanup(self.serializer_patcher.stop)
        self.mock_serializer = mock.MagicMock()
        self.mock_serializer_cons.return_value = self.mock_serializer

        self.model_patcher = mock.patch(
            "unichance.handlers.model"
        )
        self.mock_model = self.model_patcher.start()
        self.addCleanup(self.model_patcher.stop)
        self.mock_model.predict.return_value = 0.23

    def test_validation_error_returns_400(self):
        self.mock_serializer.load.side_effect = marshmallow.ValidationError("blargh")
        rv = self.app.get("/acceptance_probability")
        self.assertEqual(rv.status_code, 400)

    def test_passes_sex_parameter_to_model_correctly_when_male(self):
        self.mock_serializer.load.return_value = marshmallow.UnmarshalResult(
            data={"ethnicity": "black", "sex": "male"},
            errors={},
        )
        rv = self.app.get("/acceptance_probability")
        self.mock_model.predict.assert_called_once_with("men", "black")

    def test_passes_sex_parameter_to_model_correctly_when_female(self):
        self.mock_serializer.load.return_value = marshmallow.UnmarshalResult(
            data={"ethnicity": "black", "sex": "female"},
            errors={},
        )
        rv = self.app.get("/acceptance_probability")
        self.mock_model.predict.assert_called_once_with("women", "black")

    def test_returns_result_of_prediction_in_response(self):
        self.mock_model.predict.return_value = 0.23
        self.mock_serializer.load.return_value = marshmallow.UnmarshalResult(
            data={"ethnicity": "black", "sex": "female"},
            errors={},
        )
        rv = self.app.get("/acceptance_probability")
        result = json.loads(rv.data.decode("utf-8"))
        self.assertEqual(result["value"], 0.23)

