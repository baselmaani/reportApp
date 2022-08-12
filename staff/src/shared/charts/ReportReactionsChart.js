import { StyleSheet, Text, View, Dimensions } from 'react-native';
import React from 'react';
import { PieChart } from 'react-native-chart-kit';

const ReportReactionsChart = ({ reportReactions }) => {
  const data = [
    {
      name: 'valdigt stämmer',
      population: reportReactions.filter((c) => c.value >= 0.5).length,
      color: 'rgba(131, 167, 234, 1)',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },

    {
      name: 'stämmer',
      population: reportReactions.filter((c) => c.value > 0.25 && c.value < 0.5)
        .length,
      color: 'rgba(0, 188, 212,1.0)',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },

    {
      name: 'vanligt',
      population: reportReactions.filter(
        (c) => c.value > -0.25 && c.value < 0.25
      ).length,
      color: 'rgba(255, 235, 59,1.0)',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },

    {
      name: 'stämmer alls',
      population: reportReactions.filter((c) => c.value < 0.25).length,
      color: 'rgba(255, 87, 34,1.0)',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
  ];

  const chartConfig = {
    backgroundGradientFrom: '#fff',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#fff',
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(3, 169, 244,${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };

  return (
    <View style={styles.chartStyle}>
      <PieChart
        data={data}
        width={Dimensions.get('window').width}
        height={220}
        chartConfig={chartConfig}
        accessor={'population'}
        backgroundColor={'transparent'}
        paddingLeft={'0'}
        center={[(Dimensions.get('window').width - 220) / 2, 20]}
        absolute
        hasLegend={false}
      />
      <View style={styles.indecators}>
        {data.map((c) => (
          <View style={styles.indecatorStyle} key={c.name}>
            <View style={{ ...styles.indecator, backgroundColor: c.color }} />
            <Text style={styles.indecatorText}>{` ${c.population} (${(
              (c.population / reportReactions.length) *
              100
            ).toFixed(2)} %) ${c.name}`}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default ReportReactionsChart;

const styles = StyleSheet.create({
  chartStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  indecators: {
    marginTop: 10,
    marginBottom: 10,
    justifyContent: 'flex-start',
  },
  indecatorStyle: {
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  indecator: {
    width: 10,
    height: 10,
    borderRadius: 50,
    marginRight: 10,
  },
  indecatorText: {
    fontSize: 10,
    color: '#3c3c3c50',
  },
});
