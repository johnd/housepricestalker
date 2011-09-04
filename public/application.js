
var datasets = {};

$(function(){
	$.getJSON("/prices.json", function (prices) {
		datasets.est_value = {
			label: "Est. Value",
			data: prices
		};
		$.getJSON("/debt.json", function (debt) {
			datasets.debt = {
				label: "Debt",
				data: debt,
				color: "red"
			};


			// insert checkboxes 
			var choiceContainer = $("#choices");
			$.each(datasets, function(key, val) {
				choiceContainer.append('<br/><input type="checkbox" name="' + key +
				'" checked="checked" id="id' + key + '">' +
				'<label for="id' + key + '">'
				+ val.label + '</label>');
			});
			
			function plotAccordingToChoices() {
				var data = [];

				choiceContainer.find("input:checked").each(function () {
					var key = $(this).attr("name");
					if (key && datasets[key])
					data.push(datasets[key]);
				});

				if (data.length > 0)
				$.plot($("#graph"), data, {
					xaxis: {
						mode: "time",
						timeformat: "%y/%m/%d"
					},
					grid: { hoverable: true, clickable: true },
					lines: { show: true },
				});
			}

			choiceContainer.find("input").click(plotAccordingToChoices);



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
	});
});
