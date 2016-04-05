import pandas
from os import path

PROJECT_ROOT = path.dirname(path.dirname(path.dirname(__file__)))

def load_data_from_raw():
    base_dir = path.join(
        PROJECT_ROOT,
        "data",
        "raw",
        "acceptance_by_groups"
    )
    acceptances_file = path.join(
        base_dir,
        "app_level_report_2015-DR2_022_05.csv"
    )
    applications_file = path.join(
        base_dir,
        "app_level_report_2015-DR2_022_06.csv"
    )
    data = pandas.read_csv(
        acceptances_file,
        header=4,
        encoding="latin-1",
        quotechar="'"
    )
    applications_data = pandas.read_csv(
        applications_file,
        header=4,
        encoding="latin-1",
        quotechar="'",
    )
    data["Number of Applicants"] = applications_data["Number of Applicants"]
    cols = list(data.columns)
    for col in cols:
        if "Unnamed" in col:
            del(data[col])
    return data


if __name__ == "__main__":
    dataframe = load_data_from_raw()
    dataframe.to_csv(
        path.join(PROJECT_ROOT, "data", "extracted.csv"),
        index=False,
    )
