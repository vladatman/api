const refs = {
    buttonsClick: document.querySelector('.buttons_click'),
    wrapper: document.querySelector('.wrapper'),
    submit: document.querySelector('#saveSubmit'),
    formConsole: document.querySelector('#form_39090'),
    formNetflix: document.querySelector('#form_39091'),
    formSteam: document.querySelector('#form_39092'),
    buttonData: document.querySelector('.button-data'),
}

const postData = (type, data) => {
    fetch(`http://localhost:8080/${type}/add`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
        },
    })
        .then(response => response.json())
        .then(post => console.log(post))
        .catch(error => console.log(error));
}


const checkingDataRules = (type, data) => {
    let isRight = true;
    const verifyText = (strArr) => {
        console.log(strArr);
        strArr.forEach(itemT => {
            let itemSec = itemT.split("");
            console.log(itemSec);
            if (itemSec.length < 1 || itemSec.length > 255) {
                alert('you made a mistake in the text box\n(possible error: empty or crowded field)\nyour tex should be in the range of 1 to 255');
                isRight = false;
            }
        });

    }
    const verifyNumber = (num) => {
        console.log('num', num);
        if (isNaN(parseInt(num, 10))) {
            alert('is not number, you must eneter number data');
            isRight = false;
        } else if (num.length < 0.1 || num.length > 100) {
            alert('incorect data number should be betwen 0.1 and 100');
            isRight = false;
        }
    }
    const verifyYear = (num) => {
        if (isNaN(parseInt(num, 10))) {
            alert('is not number, you must eneter number data');
            isRight = false;
        } else if (num.length < 1900 || num.length > 2021) {
            alert('incorect data number should be betwen 1900 and 2021');
            isRight = false;
        } else isRight = false;
    }
    const verifyPrice = (num) => {
        if (Number(num) < 1) {
            alert('incorect data number should be more then 0');
            isRight = false;
        }
    }
    if (type === 'console') {
        console.log('console yeeeeee', data)
        verifyText([data.title, data.console, data.genre, data.developer, data.release_date]) || verifyNumber(data.total_sales);

    } else if (type === 'netflix') {
        verifyText([data.title, data.director, data.country, data.genre, data.release_year]) || verifyYear(data.release_year);
    } else {
        verifyText([data.title, data.developer, data.genres, data.release_date]) || verifyPrice(data.price);
    }
    return isRight;
}



const handleConsoleSubmit = event => {
    event.preventDefault();
    console.log(event.currentTarget.elements);
    const [title, consol, genre, developer, totalSales, dateD, dateM, dateY] = event.currentTarget.elements;
    // const inputValue = title.value;
    console.log(dateD.value, dateM.value, dateY.value);
    const inputValue = {
        id: "600006",
        title: title.value,
        console: consol.value,
        genre: genre.value,
        developer: developer.value,
        total_sales: totalSales.value,
        release_date: `${dateM.value}-${dateD.value}-${dateY.value}`,
    };
    console.log(inputValue);
    if (!checkingDataRules('console', inputValue)) return;
    // consol.log(checkingDataRules('console', inputValue));
    postData('console', inputValue);
}

// id int(11) NOT NULL,
// title varchar(104) NOT NULL,
// director varchar(208) DEFAULT NULL,
// country varchar(123) DEFAULT NULL,
// release_year int(11) NOT NULL,
// duration varchar(10) NOT NULL,
// genre varchar(79) NOT NULL

const handleNetflixSubmit = event => {
    event.preventDefault();
    console.log(event.currentTarget.elements);
    const [title, director, country, release, duration, genre] = event.currentTarget.elements;

    const inputValue = {
        id: "6000010",
        title: title.value,
        director: director.value,
        country: country.value,
        release_year: release.value,
        duration: duration.value,
        genre: genre.value,
    };
    console.log(inputValue);

    if (!checkingDataRules('netflix', inputValue)) return;
    console.log('success');
    postData('netflix', inputValue);
}


const handleSteamSubmit = event => {
    event.preventDefault();
    console.log(event.currentTarget.elements);
    const [title, developer, genres, price, dateD, dateM, dateY] = event.currentTarget.elements;

    const inputValue = {
        id: "600001",
        title: title.value,
        developer: developer.value,
        genres: genres.value,
        price: price.value,
        release_date: `${dateD.value}-${dateM.value}-${dateY.value}`,
    };
    console.log(inputValue);
    if (!checkingDataRules('steam', inputValue)) return;

    postData('netflix', inputValue);
}

const handleClick = event => {
    // console.log(event.target);
    const el = event.target;
    console.log(el.className);
    if (el.className === 'active-form') return;
    const classes = [...el.parentNode.children];
    classes.forEach(element => {
        element.classList.contains('active-form') ? element.classList.remove('active-form') : null;
    });
    el.classList.add('active-form');


    [...refs.wrapper.children].forEach(element => {
        element.classList.contains('hide-form') ? null : element.classList.add('hide-form');
    });
    if (el.innerText === 'Console') {
        refs.formConsole.classList.remove('hide-form');
    } else if (el.innerText === 'Netflix') {
        refs.formNetflix.classList.remove('hide-form');
    } else if (el.innerText === 'Steam') {
        refs.formSteam.classList.remove('hide-form');
    }
    console.log(classes);
}

refs.formConsole.addEventListener('submit', handleConsoleSubmit);
refs.formNetflix.addEventListener('submit', handleNetflixSubmit);
refs.formSteam.addEventListener('submit', handleSteamSubmit);
refs.buttonsClick.addEventListener('click', handleClick);

const InfoA = [];
const InfoB = [];

const saveDataA = (data) => {

    if (InfoA.length === 0) {
        InfoA.push(data);
    } else if (InfoA.length === 1) {
        InfoA.push(data);
        paint();
    } else if (InfoA.length === 2) {
        InfoA = [];
        InfoA.push(data);
    }
}

const getDataDiagram = (data) => {
    const prepearedObg = {};
    // console.log(data)
    const prepearedData = Object.keys(data[0]).concat(Object.keys(data[1])).concat(Object.keys(data[2]));
    prepearedObg.prepearedData = [...prepearedData];
    prepearedObg.console = Object.values(data[0]);
    prepearedObg.netflix = Object.values(data[1]);
    prepearedObg.steam = Object.values(data[2]);
    return prepearedObg;
}

const saveDataB = (data) => {
    if (InfoB.length === 2) {
        InfoB.push(data);
        const dataD = getDataDiagram(InfoB);
        console.log(dataD);
        paintB(dataD);
    }
    else if (InfoB.length === 3) {
        InfoB = [];
        InfoB.push(data);
    } else {
        InfoB.push(data);
    }

}
function paint() {
    const DATA_COUNT = 7;
    const NUMBER_CFG = { count: DATA_COUNT, min: -100, max: 100 };

    // const labels = Utils.months({ count: 7 });
    const data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [
            {
                label: 'Console',
                data: [InfoA[0]['1'], InfoA[0]['2'], InfoA[0]['3'], InfoA[0]['4'], InfoA[0]['5'], InfoA[0]['6'], InfoA[0]['7'], InfoA[0]['8'], InfoA[0]['9'], InfoA[0]['10'], InfoA[0]['11'], InfoA[0]['12']],
                borderColor: '#FF0033',
                backgroundColor: '#FF0033',
            },
            {
                label: 'Steam',
                data: [InfoA[1]['1'], InfoA[1]['2'], InfoA[1]['3'], InfoA[1]['4'], InfoA[1]['5'], InfoA[1]['6'], InfoA[1]['7'], InfoA[1]['8'], InfoA[1]['9'], InfoA[1]['10'], InfoA[1]['11'], InfoA[1]['12']],
                borderColor: '#990033',
                backgroundColor: '#990033',
            }
        ]
    };
    const config = {
        type: 'bar',
        data: data,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Comparison of games on the console and PC from the steam by months of release for all time'
                }
            }
        },
    };
    const myChart = new Chart(
        document.getElementById('myChart'),
        config
    );
}

function paintB(dataObj) {
    // const DATA_COUNT = 5;
    // const NUMBER_CFG = { count: DATA_COUNT, min: 0, max: 100 };

    // const labels = Utils.months({ count: 7 });
    const colorData = (type, l) => {
        const typeColor = {
            console: ['#CCCCFF', '#9999FF', '#9999CC', '#6666FF', '#6666CC', '#6633FF', '#6600FF', '#333399', '#330099', '#330066'],
            netflix: ['#FFCCCC', '#FF9999', '#CC6666', '#FF6666', '#FF3333', '#FF0000', '#CC0000', '#990000', '#660000', '#330000'],
            steam: ['#66CCFF', '#33CCFF', '#00CCFF', '#6699CC', '#3399CC', '#0099CC', '#336699', '#006699', '#003399', '#003366'],
        }
        if (type === 'console') {
            return typeColor.console.slice(0, l);
        } else if (type === 'netflix') {
            return typeColor.netflix.slice(0, l);
        } else {
            return typeColor.steam.slice(0, l);
        }
    }



    const data = {
        labels: dataObj.prepearedData,
        datasets: [
            {
                backgroundColor: colorData('console', dataObj.console.length),
                data: dataObj.console,
            },
            {
                backgroundColor: colorData('netflix', dataObj.netflix.length),
                data: dataObj.netflix,
            },
            {
                backgroundColor: colorData('steam', dataObj.steam.length),
                data: dataObj.steam,
            },
        ]
    };
    const config = {
        type: 'pie',
        data: data,
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Comparison of games on the console and PC from the steam by months of release for all time'
                },
                legend: {
                    labels: {
                        generateLabels: function (chart) {
                            // Get the default label list
                            const original = Chart.overrides.pie.plugins.legend.labels.generateLabels;
                            const labelsOriginal = original.call(this, chart);

                            // Build an array of colors used in the datasets of the chart
                            let datasetColors = chart.data.datasets.map(function (e) {
                                return e.backgroundColor;
                            });
                            datasetColors = datasetColors.flat();

                            // Modify the color and hide state of each label
                            labelsOriginal.forEach(label => {
                                // There are twice as many labels as there are datasets. This converts the label index into the corresponding dataset index
                                label.datasetIndex = (label.index - label.index % 2) / 2;

                                // The hidden state must match the dataset's hidden state
                                label.hidden = !chart.isDatasetVisible(label.datasetIndex);

                                // Change the color to match the dataset
                                label.fillStyle = datasetColors[label.index];
                            });

                            return labelsOriginal;
                        }
                    },
                    onClick: function (mouseEvent, legendItem, legend) {
                        // toggle the visibility of the dataset from what it currently is
                        legend.chart.getDatasetMeta(
                            legendItem.datasetIndex
                        ).hidden = legend.chart.isDatasetVisible(legendItem.datasetIndex);
                        legend.chart.update();
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            const labelIndex = (context.datasetIndex * 2) + context.dataIndex;
                            return context.chart.data.labels[labelIndex] + ': ' + context.formattedValue;
                        }
                    }
                }
            }
        },
    };
    const myChartB = new Chart(
        document.getElementById('myChartB'),
        config
    );
}

const getPosts = (type) => {
    fetch(`http://localhost:8080/${type}/records`)
        .then(response => response.json())
        // .then(post => console.log(post))
        .then(post => saveDataA(post))
        .catch(error => console.log(error));
};

// getPosts('console');
// getPosts('steam');





const getYears = (type) => {
    fetch(`http://localhost:8080/${type}/years`)
        .then(response => response.json())
        // .then(post => console.log(post))
        .then(post => saveDataB(post))
        .catch(error => console.log(error));
};




const vis = e => {
    getPosts('console');
    getPosts('steam');
    getYears('console');
    getYears('netflix');
    getYears('steam');
}


const btn = document.querySelector('.button-data');

btn.addEventListener('click', vis)