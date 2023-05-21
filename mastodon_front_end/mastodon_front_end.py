import configparser
import couchdb
import requests
from dash import dcc, html, dash_table
from dash.dependencies import Input, Output, State
import dash
import pandas as pd
from urllib.parse import quote_plus
import dash_bootstrap_components as dbc


# Connect to the database
config = configparser.ConfigParser()
config.read("config.ini")

admin = config.get("couchDB", "admin")
password = config.get("couchDB", "password")
port = config.get("couchDB", "port")
ip = config.get("couchDB", "ip")
host = config.get("couchDB", "host")

base_url = f"http://{admin}:{password}@{ip}:{port}/"
server = couchdb.Server(base_url)

db = server["mastodon_db_aus"]

external_stylesheets = ["https://codepen.io/chriddyp/pen/bWLwgP.css"]
app = dash.Dash(__name__, external_stylesheets=external_stylesheets)


def get_data(view_name):
    url = f"{base_url}mastodon_db_aus_social/_design/nlp/_view/{quote_plus(view_name)}?descending=True"
    response = requests.get(url, auth=(admin, password))
    if response.status_code == 200:
        docs = response.json().get("rows", [])
        df = pd.DataFrame([doc["value"] for doc in docs])
        df["time"] = [doc["key"] for doc in docs]
        df = df.sort_values(by="time", ascending=False)
        return df
    else:
        return pd.DataFrame()


app = dash.Dash(__name__, external_stylesheets=[dbc.themes.BOOTSTRAP])
app.layout = html.Div(
    children=[
        dbc.NavbarSimple(
            children=[
                dbc.Button(
                    "Tweet Map",
                    id="btn-other-app",
                    href="http://115.146.94.76:8060",
                    color="info",
                    className="mr-5",
                    external_link=True,
                ),
                dbc.NavItem(dbc.NavLink("Food", id="btn-food", external_link=True)),
                dbc.NavItem(
                    dbc.NavLink("Alcohol", id="btn-alcohol", external_link=True)
                ),
                dbc.NavItem(
                    dbc.NavLink(
                        "Gambling & Entertainment",
                        id="btn-entertainment",
                        external_link=True,
                    )
                ),
                dbc.Button(
                    "Show Ratios", id="btn-ratio", color="success", className="mr-1"
                ),
            ],
            brand="Realtime Mastodon Dashboard",
            brand_href="#",
            color="primary",
            dark=True,
        ),
        dcc.Tabs(
            id="tabs",
            value="tab-1",
            children=[
                dcc.Tab(
                    label="Post",
                    value="tab-1",
                    children=[
                        dbc.Container(
                            [
                                dbc.Row(
                                    [
                                        dbc.Col(
                                            [
                                                html.H2("Post:"),
                                                dash_table.DataTable(
                                                    id="table",
                                                    columns=[],
                                                    data=[],
                                                    style_table={"overflowX": "auto"},
                                                    style_cell_conditional=[
                                                        {
                                                            "if": {
                                                                "column_id": "content"
                                                            },
                                                            "width": "500px",
                                                        },
                                                        {
                                                            "if": {"column_id": "name"},
                                                            "width": "50px",
                                                        },
                                                        {
                                                            "if": {"column_id": "time"},
                                                            "width": "50px",
                                                        },
                                                    ],
                                                    style_cell={
                                                        "height": "auto",
                                                        "minWidth": "100px",
                                                        "maxWidth": "100px",
                                                        "whiteSpace": "normal",
                                                    },
                                                ),
                                            ],
                                            md=12,
                                        ),
                                    ]
                                )
                            ],
                            className="mt-4",
                        ),
                    ],
                ),
                dcc.Tab(
                    label="Ratio",
                    value="tab-2",
                    children=[
                        dbc.Container(
                            [
                                dbc.Row(
                                    [
                                        dbc.Col(
                                            [
                                                html.H2("Ratio:"),
                                                dcc.Graph(
                                                    id="ratio-pie",
                                                ),
                                            ],
                                            md=12,
                                        ),
                                    ]
                                )
                            ],
                            className="mt-4",
                        ),
                    ],
                ),
            ],
        ),
    ]
)


@app.callback(
    Output("ratio-pie", "style"),
    Input("btn-ratio", "n_clicks"),
    Input("btn-food", "n_clicks"),
    Input("btn-alcohol", "n_clicks"),
    Input("btn-entertainment", "n_clicks"),
    prevent_initial_call=True,
)
def toggle_pie(ratio, food, alcohol, entertainment):
    ctx = dash.callback_context
    if not ctx.triggered:
        button_id = "No clicks yet"
    else:
        button_id = ctx.triggered[0]["prop_id"].split(".")[0]

    if button_id == "btn-ratio":
        return {"display": "block"}  # Show the pie chart
    elif button_id in ["btn-food", "btn-alcohol", "btn-entertainment"]:
        return {"display": "none"}  # Hide the pie chart

    return dash.no_update


@app.callback(
    Output("ratio-pie", "figure"),
    Input("btn-ratio", "n_clicks"),
    prevent_initial_call=True,
)
def update_pie(n):
    labels = ["Food", "Alcohol", "Entertainment"]
    values = []
    views = ["food-ratio", "drink-ratio", "entertainment-ratio"]
    for view in views:
        url = f"{base_url}mastodon_db_aus_social/_design/nlp/_view/{quote_plus(view)}?reduce=true&group=true"
        response = requests.get(url, auth=(admin, password))
        if response.status_code == 200:
            value = response.json().get("rows", [])[0]["value"]["ratio"]
            values.append(value)

    figure = {
        "data": [{"values": values, "labels": labels, "type": "pie"}],
        "layout": {"title": "Post Topic Ratio"},
    }

    return figure


@app.callback(
    Output("table", "columns"),
    Output("table", "data"),
    Input("btn-food", "n_clicks"),
    Input("btn-alcohol", "n_clicks"),
    Input("btn-entertainment", "n_clicks"),
    prevent_initial_call=True,
)
def update_table(btn1, btn2, btn3):
    ctx = dash.callback_context
    if not ctx.triggered:
        button_id = "No clicks yet"
    else:
        button_id = ctx.triggered[0]["prop_id"].split(".")[0]

    if button_id == "btn-food":
        view_name = "food-content"
    elif button_id == "btn-alcohol":
        view_name = "drink-content"
    elif button_id == "btn-entertainment":
        view_name = "entertainment-content"

    # Fetch data from view
    df = get_data(view_name)

    # Update table
    columns = [{"name": i, "id": i} for i in df.columns]
    # print(columns)
    data = df.to_dict("records")
    return columns, data


if __name__ == "__main__":
    app.run_server(debug=False, host="0.0.0.0", port=8050)
