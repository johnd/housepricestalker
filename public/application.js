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
				lines: { show: true },
				points: { show: true }
			});
		});
	});
});