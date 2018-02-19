/**
 * A small plugin for getting the CSV of a categorized chart
 */
(function (Highcharts) {
    var each = Highcharts.each;
    Highcharts.Chart.prototype.getCSV = function () {
        var xAxis = this.xAxis[0],
            columns = [],
            line,
            csv = "", 
            row,
            col;
        
        if (xAxis.categories) {
            columns.push(xAxis.categories);
            columns[0].unshift("");
        }
        each (this.series, function (series) {
            columns.push(series.yData);
            columns[columns.length - 1].unshift(series.name);
        });
        
        // Transform the columns to CSV
        for (row = 0; row < columns[0].length; row++) {
            line = [];
            for (col = 0; col < columns.length; col++) {
                line.push(columns[col][row]);
            }
            csv += line.join(',') + '\n';
        }
        return csv;
    };    
}(Highcharts));
