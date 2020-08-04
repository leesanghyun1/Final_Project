new Morris.Bar({
	element: 'inbody_chart',
	data: [
	{ year: '2019-01-11', a: <%=results[0].front_sh%>, b: 10, c: 43 },
	{ year: '2019-03-11', a: 68, b: 12, c: 45 },
	{ year: '2019-05-11', a: 67, b: 8, c: 44 },
],
	xkey: 'year',
	ykeys: ['a', 'b','c'],
	labels: ['몸무게', '체지방','근육량']
});