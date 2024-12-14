google.charts.load('current', { packages: ['corechart'] });
google.charts.setOnLoadCallback(drawChart);

async function drawChart() {
  const apiUrl = "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec?action=getCompanyStockData&companyName=APA-KASUMI";

  try {
    // Google Apps Scriptからデータを取得
    const response = await fetch(apiUrl);
    const result = await response.json();

    if (result.status === "success") {
      const data = result.data;

      // Googleチャート用データを整形
      const chartData = [['Date', 'Stock Price']];
      data.forEach(item => {
        const date = new Date(item.date); // 日付をDateオブジェクトに変換
        const stockPrice = parseFloat(item.stockPrice); // 株価を数値に変換
        chartData.push([date, stockPrice]);
      });

      // データテーブルを作成
      const dataTable = google.visualization.arrayToDataTable(chartData);

      // グラフのオプション設定
      const options = {
        title: 'Stock Price Over Time',
        hAxis: { title: 'Date', format: 'MMM dd, yyyy HH:mm', slantedText: true },
        vAxis: { title: 'Stock Price' },
        legend: { position: 'bottom' },
        width: 900,
        height: 500
      };

      // グラフを描画
      const chart = new google.visualization.LineChart(document.getElementById('chart_div'));
      chart.draw(dataTable, options);
    } else {
      document.getElementById('chart_div').innerHTML = `<p>Error: ${result.message}</p>`;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    document.getElementById('chart_div').innerHTML = `<p>Error fetching data</p>`;
  }
}
