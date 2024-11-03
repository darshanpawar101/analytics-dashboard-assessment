// REDUCE FUNCTIONS

// Reduce function to calculate data for Bar Chart
function getVehicleDistributionByTypeAndYear(data) {
  return data.reduce((acc, item) => {
    const year = item["modelYear"];
    const type = item["type"];
    if (!acc[year]) acc[year] = { BEV: 0, PHEV: 0 };
    if (type.includes("Battery Electric Vehicle")) acc[year].BEV++;
    else if (type.includes("Plug-in Hybrid Electric Vehicle")) acc[year].PHEV++;
    return acc;
  }, {});
}

//Reduce function to calculate data for Pie Chart
function getVehicleDistributionByManufacturer(data) {
  return data.reduce((acc, item) => {
    const make = item["make"];
    acc[make] = (acc[make] || 0) + 1;
    return acc;
  }, {});
}

// Reduce function to calculate data for Scatter Chart
function getElectricRangeComparisonByModel(data) {
  return data.reduce((acc, item) => {
    const type = item["type"];
    const range = parseInt(item["range"], 10);
    if (!isNaN(range)) {
      if (!acc[type]) acc[type] = [];
      acc[type].push({
        range,
        modelYear: item["modelYear"],
        name: `${item["make"]} ${item["model"]}`,
        type: item["type"],
      });
    }
    return acc;
  }, {});
}

function getAverageBaseMSRPByTypeAndYear(data) {
  const result = data.reduce((acc, item) => {
    const year = item["modelYear"];
    const type = item["type"];
    const msrp = parseFloat(item["msrp"]);
    if (!isNaN(msrp)) {
      if (!acc[year]) {
        acc[year] = {
          BEV: { total: 0, count: 0 },
          PHEV: { total: 0, count: 0 },
        };
      }

      const key = type.includes("Battery Electric Vehicle") ? "BEV" : "PHEV";

      if (key) {
        acc[year][key].total += msrp;
        acc[year][key].count += 1;
      }
    }
    return acc;
  }, {});

  return result;
}

function getEVPopulationByUtility(data) {
  return data.reduce((acc, item) => {
    const utility = item["utilityProvider"].includes("||")
      ? item["utilityProvider"]?.split("||")
      : item["utilityProvider"].includes("|")
      ? item["utilityProvider"]?.split("|")
      : [item["utilityProvider"]];
    if (utility?.length) {
      utility?.forEach((utl) => {
        acc[utl] = (acc[utl] || 0) + 1;
      });
    }

    return acc;
  }, {});
}

function getEVDensityByLegislativeDistrict(data) {
  return data.reduce((acc, item) => {
    const district = item["district"];
    if (district) {
      acc[district] = (acc[district] || 0) + 1;
    }
    return acc;
  }, {});
}

function getBatteryRangeEligibility(data) {
  return data.reduce((acc, item) => {
    const eligibility = item["cafvEligibility"];
    const range = parseInt(item["range"], 10);
    const category = eligibility.includes("Eligible")
      ? "Eligible"
      : "Not Eligible";
    if (!isNaN(range)) {
      if (!acc[category]) acc[category] = [];
      acc[category].push(range);
    }
    return acc;
  }, {});
}

// CHART DATA FUNCTIONS

export const getBarChartData = (data) => {
  const vehicleData = getVehicleDistributionByTypeAndYear(data);
  const vehicleDataArray = Object.keys(vehicleData)?.map((item) => ({
    year: item,
    ...vehicleData[item],
  }));

  return vehicleDataArray;
};

export const getPieChartData = (data) => {
  const vehicleData = getVehicleDistributionByManufacturer(data);

  const vehicleDataArray = Object.keys(vehicleData)
    ?.map((item) => ({
      name: item,
      value: vehicleData[item],
    }))
    ?.sort((a, b) => b.value - a.value);

  return vehicleDataArray;
};

export const getAreaChartData = (data) => {
  const vehicleData = getElectricRangeComparisonByModel(data);

  const vehicleDataArray = Object.keys(vehicleData)?.map((item) => ({
    name: item,
    data: vehicleData[item],
  }));

  return vehicleDataArray;
};

export const getLineChartData = (data) => {
  const vehicleData = getAverageBaseMSRPByTypeAndYear(data);

  const vehicleDataArray = Object.keys(vehicleData).map((year) => ({
    year,
    BEV: parseInt(
      String(vehicleData[year].BEV.total / vehicleData[year].BEV.count || 0)
    ),
    BEVtotal: vehicleData[year].BEV.total,
    BEVcount: vehicleData[year].BEV.count,
    PHEVtotal: vehicleData[year].PHEV.total,
    PHEVcount: vehicleData[year].PHEV.count,
    PHEV: parseInt(
      String(vehicleData[year].PHEV.total / vehicleData[year].PHEV.count || 0)
    ),
  }));

  return vehicleDataArray;
};

export const getLineChartElectricUsageData = (data) => {
  const vehicleData = getEVPopulationByUtility(data);

  const vehicleDataArray = Object.keys(vehicleData)
    .map((provider) => ({
      name: provider,
      value: vehicleData[provider],
    }))
    ?.filter((provider) => provider.value > 300);

  return vehicleDataArray;
};

export const getBarChartDistrictAreaData = (data) => {
  const vehicleData = getEVDensityByLegislativeDistrict(data);

  const vehicleDataArray = Object.keys(vehicleData).map((dist) => ({
    name: `Dist - ${dist}`,
    value: vehicleData[dist],
  }));

  return vehicleDataArray;
};

export const getBarChartRangeEligibilityData = (data) => {
  const vehicleData = getBatteryRangeEligibility(data);

  const vehicleDataArray = Object.keys(vehicleData).map((dist) => ({
    name: `Dist - ${dist}`,
    value: vehicleData[dist],
  }));

  return vehicleDataArray;
};
