const chartWrapper = document.getElementById("chart");
const chartItems = document.querySelectorAll("#chart-item");
let chartTips = document.querySelectorAll("#chart-info");

function showChartTip(dayNumber, daysData, chartItem){
    chartItem.textContent = `$${daysData[dayNumber].amount}`;
}

fetch("data.json")
.then(response => {
   return response.json();
})
.then(function(daysData) {
    let maxAmount = 0;
    let dayOfMaxAmount = 0;

    for (let i = 0; i < daysData.length; i++){
        if (daysData[i].amount >= maxAmount){
            maxAmount = daysData[i].amount;
            dayOfMaxAmount = i;
        }
    }
    chartItems[dayOfMaxAmount].style.backgroundColor = "hsl(186, 34%, 60%)";

    if (maxAmount !== 0){
        for (let i = 0; i < daysData.length; i++){
            chartItemHeightPercent = daysData[i].amount / maxAmount * 100 - 17;
            chartItems[i].style.height = `${chartItemHeightPercent}%`;
        }

        for (let i = 0; i < chartItems.length; i++) {
            showChartTip(i, daysData, chartTips[i]);
            chartItems[i].addEventListener("mouseover", () => {
                chartTips[i].style.opacity=1;
            });
            chartItems[i].addEventListener("click", () => {
                chartTips[i].style.opacity= Math.abs(chartTips[i].style.opacity - 1);
            });
            chartItems[i].addEventListener("mouseleave", () => {
                chartTips[i].style.opacity=0;
            });
        }
    }

});



