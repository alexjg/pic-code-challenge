#Running in development

```shell
pip install -r requirements.txt
npm install
python manage.py runserver #in one terminal window
npm run web # in another terminal window
Visit localhost:5000
```

##Tests
Frontend tests are in `assets/js/tests` and backend tests are in `unichance/tests/`. To run them

```shell
npm run test
python -m unittest discover
```
