$(function () {
	$.getJSON("/prices.json", function (prices) {
		$.getJSON("/debt.json", function (debt) {
			$.plot($("#graph"), [{
				data: debt,
				color: "red",
				label: "Debt",
				points: { show: false }
			},
			{
				data: prices,
				label: "Est. Value"
			}], {
				xaxis: {
					mode: "time",
					timeformat: "%y/%m/%d"
				},
				grid: { hoverable: true, clickable: true },
				lines: { show: true },
				points: { show: true }
			});
		});
	});

	function showTooltip(x, y, contents) {
		$('<div id="tooltip">' + contents + '</div>').css(
			{
				position: 'absolute',
				display: 'none',
				top: y + 5,
				left: x + 5,
				border: '1px solid #ddd',
				padding: '2px',
				'background-color': '#eee',
				opacity: 0.80
			}
		).appendTo("body").fadeIn(200);
	}

	var previousPoint = null;
	$("#graph").bind("plothover", function (event, pos, item) {

		if (item) {
			if (previousPoint != item.datapoint) {
				previousPoint = item.datapoint;

				$("#tooltip").remove();
				var x = item.datapoint[0].toFixed(2),
				y = item.datapoint[1].toFixed(2);

				showTooltip(item.pageX, item.pageY,	item.series.label + ": &pound;" + y);
			}
		}
		else {
			$("#tooltip").remove();
			previousPoint = null;            
		}
	});

});