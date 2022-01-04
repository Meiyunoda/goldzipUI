import { CheckIcon, CloseIcon, Search2Icon } from '@chakra-ui/icons';
import {
  Box, Button, FormControl, FormLabel, Grid,
  GridItem, Input, Select, Stack, Tab, Table, TabList, TabPanel, TabPanels, Tabs, Tbody, Td, Text, Th, Thead, Tr
} from "@chakra-ui/react";
import axios from 'axios';
import * as FileSaver from 'file-saver';
import { Field, Form, Formik } from "formik";
import { useSession } from 'next-auth/client';
import React, { useEffect, useState } from "react";
import * as XLSX from 'xlsx';
import { ChakraField, ImageUpload } from "../../components";


const searchButton = {
  backgroundColor: '#E2C16C',
  borderTopLeftRadius: '0px',
  borderBottomLeftRadius: '0px',
};
const searchBar = {
  width: '100%',
  borderColor: '#fffafa',
  borderTopRightRadius: '0px',
  borderBottomRightRadius: '0px',
  borderRight: 'none',
};
const hover = {
  cursor: 'pointer',
};


const TableTemplate = (props) => {
  return <>
    <Box mt="10" ml="4">
      {props.title}
    </Box>
    <Table variant="simple" mt="4" size="sm">
      <Thead>
        <Tr>
          {props.headers.map(function (header, idx) {
            return <React.Fragment key={idx}>
              <Th>
                {header}
              </Th>
              {(props.editing && idx != 0) &&
                <Th />
              }
            </React.Fragment>
          })}
        </Tr>
      </Thead>
      <Tbody>
        {props.data.map(function (values, idv) {
          return (
            <Tr key={idv}>
              {values.map(function (value, idx) {
                return <React.Fragment key={idx}>
                  <Td>
                    {idx == 0 ? value : value[0]}
                  </Td>
                  {(props.editing && idx != 0) &&
                    <Td>
                      <Input value={props.updateData[value[1]]} onChange={(v) => {
                        const tempData = { ...props.updateData };
                        tempData[value[1]] = v.target.value
                        props.setUpdateData(tempData);
                      }} />
                    </Td>
                  }
                </React.Fragment>
              })}
            </Tr>
          )
        })}
      </Tbody>
    </Table>
  </>
}


const ReferencesTable = (props) => {
  return <>
    <TableTemplate
      title="References"
      headers={["Reference Type", "Value"]}
      data={[["Deposit Ref", [props.goldbar?.depositRef, "depositRef"]],
      ["Stock Out Ref", [props.goldbar?.stockOutRef, "stockOutRef"]],
      ["Assay Ref", [props.goldbar?.assayRef, "assayRef"]],
      ["Refine Ref", [props.goldbar?.refineRef, "refineRef"]]]}
      editing={props.editing}
      updateData={props.updateData}
      setUpdateData={props.setUpdateData}
    />
  </>
}

const DatesTable = (props) => {
  return <>
    <TableTemplate
      title="Dates Of Interest"
      headers={["Date Type", "Value"]}
      data={[["Mint Approval Date", [props.goldbar?.mintApprovalDate?.substring(0, 10), "mintApprovalDate"]],
      ["Reserved Date", [props.goldbar?.dateReserved?.substring(0, 10), "dateReserved"]],
      ["Burn Approval Date", [props.goldbar?.burnApprovalDate?.substring(0, 10), "burnApprovalDate"]]]}
      editing={props.editing}
      updateData={props.updateData}
      setUpdateData={props.setUpdateData}
    />
  </>
}

const LocationRecordTable = (props) => {
  return <>
    <TableTemplate
      title="Location Record"
      headers={["Location", "Date In", "Date Out"]}
      data={[["WareHouse",
        [props.goldbar?.warehouse?.dateIn?.substring(0, 10), "warehouse.dateIn"],
        [props.goldbar?.warehouse?.dateOut?.substring(0, 10), "warehouse.dateOut"]],
      ["Assay Center",
        [props.goldbar?.assayCenter?.dateIn?.substring(0, 10), "assayCenter.dateIn"],
        [props.goldbar?.assayCenter?.dateOut?.substring(0, 10), "assayCenter.dateOut"]],
      ["GoldShop",
        [props.goldbar?.goldShop?.dateIn?.substring(0, 10), "goldShop.dateIn"],
        [props.goldbar?.goldShop?.dateOut?.substring(0, 10), "goldShop.dateOut"]],
      ]}
      editing={props.editing}
      updateData={props.updateData}
      setUpdateData={props.setUpdateData}
    />
  </>
}

const BasicInfoTable = (props) => {
  return <>
    <Box mt="10" ml="4">
      Basic Information
    </Box>
    <Table variant="simple" mt="4" size="sm">
      <Thead>
        <Tr>
          <Th>Country Of Origin</Th>
          <Th>Fineness</Th>
          <Th>Net Weight</Th>
        </Tr>
      </Thead>
      <Tbody>
        <Tr>
          <Td>
            {props.goldbar?.originCountry}
          </Td>
          <Td>
            {props.goldbar?.fineness}
          </Td>
          <Td>
            {props.goldbar?.netWeight}
          </Td>
        </Tr>
        {props.editing && <Tr>
          <Td>
            <Input value={props.updateData['originCountry']} onChange={(v) => props.setUpdateData({ ...props.updateData, originCountry: v.target.value })} />
          </Td>
          <Td>
            <Input value={props.updateData['fineness']} onChange={(v) => props.setUpdateData({ ...props.updateData, fineness: v.target.value })} />
          </Td>
          <Td>
            <Input value={props.updateData['netWeight']} onChange={(v) => props.setUpdateData({ ...props.updateData, netWeight: v.target.value })} />
          </Td>
        </Tr>}
      </Tbody>
    </Table>
  </>
}

const ExpandedBox = (props) => {
  const [auth] = useSession();

  return (
    <Box mt="10" borderWidth="2px" borderRadius="lg">
      <Box align="center">
        <Box mt="4">
          {!props.editing &&
            <Button onClick={() => {
              props.setEditing(true);
              props.setUpdateData({ serialNum: props.goldbar?.serialNum });
            }}>
              Edit
            </Button>
          }
          {props.editing && <>
            <Button ml="4" colorScheme="green" leftIcon={<CheckIcon />}
              onClick={() => {
                Object.keys(props.updateData).forEach((k) => props.updateData[k] == "" && delete props.updateData[k]);
                axios.post(`/tracking/goldbar/update`, props.updateData, { headers: { 'Authorization': auth?.accessToken } })
                  .then(function (response) {
                    props.setEditing(!props.editing);
                    props.setUpdateData({});
                  })
                  .catch(function (error) {
                    console.log(error);
                  })
              }}>
              Confirm changes
            </Button>
            <Button ml="4" colorScheme="red" leftIcon={<CloseIcon />}
              onClick={() => {
                props.setEditing(!props.editing);
                props.setUpdateData({});
              }}>
              Discard Changes
            </Button>
          </>
          }
        </Box>
      </Box>
      <Table variant="simple" mt="5" size="sm">
        <Thead>
          <Tr>
            <Th>Serial Number</Th>
            <Th>Brand</Th>
            <Th>Status</Th>
            <Th>Current Location</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>
              {props.goldbar?.serialNum}
            </Td>
            <Td>
              {props.goldbar?.brandName}
            </Td>
            <Td>
              {props.goldbar?.barStatus}
            </Td>
            <Td>
              {props.goldbar?.currentLocation}
            </Td>
          </Tr>
          {props.editing && <Tr>
            <Td />
            <Td>
              <Select onChange={(v) => {
                props.setUpdateData({ ...props.updateData, brandName: v.target.value })
              }}>
                <option value="">Select Brand</option>
                <option value="GOLDZIP">GOLDZIP</option>
                <option value="LBMA">LBMA</option>
              </Select>
            </Td>
            <Td>
              <Select onChange={(v) => {
                props.setUpdateData({ ...props.updateData, barStatus: v.target.value })
              }}>
                <option value="">Select Status</option>
                <option value="Waiting For Assay">Waiting For Assay</option>
                <option value="Assaying">Assaying</option>
                <option value="Available">Available</option>
                <option value="Reserved">Reserved</option>
                <option value="Waiting For Collection">Waiting For Collection</option>
                <option value="Collected">Collected</option>
              </Select>
            </Td>
            <Td>
              <Select onChange={(v) => {
                props.setUpdateData({ ...props.updateData, currentLocation: v.target.value })
              }}>
                <option value="">Select Location</option>
                <option value="Warehouse">Warehouse</option>
                <option value="Assay Center">Assay Center</option>
                <option value="Gold Shop">Gold Shop</option>
              </Select>
            </Td>
          </Tr>}
        </Tbody>
      </Table>
      {BasicInfoTable(props)}
      {LocationRecordTable(props)}
      {DatesTable(props)}
      {ReferencesTable(props)}
      <Box mt="30px" mb="30px" align="center">
        {props.goldbar.image &&
          (
            props.goldbar.image.match(/^http[^\?]*.(jpg|jpeg|gif|png|tiff|bmp)(\?(.*))?$/gmi) != null
              ? <img
                src={props.goldbar.image}
                alt="Uploaded Images"
                height="300"
                width="400"
              />
              : <div><br /><a href={props.goldbar.image} target={'_blank'} >Check {props.goldbar.image}</a></div>
          )
        }
      </Box>
    </Box>)
}

const ExportAsExcelFile = (json: any[], excelFileName: string): void => {
  const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
  const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
  const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const data: Blob = new Blob([excelBuffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
  });
  FileSaver.saveAs(data, excelFileName + ".xlsx");
}

const Tracking = () => {
  const [expanded, setExpanded] = useState(null);
  const [serialNumFilter, setSerialNumFilter] = useState("");
  const [barData, setBarData] = useState([])
  const [editing, setEditing] = useState(false);
  const [updateData, setUpdateData] = useState({})
  const [auth] = useSession();

  // useEffect(() => { console.log(updateData) }, [updateData])

  useEffect(() => {
    if (auth) {
      axios.get(`/tracking/goldbar/getall`, { headers: { 'Authorization': auth?.accessToken } })
        .then(function (response) {
          setBarData(response.data);
        })
        .catch(function (error) {
          console.log(error);
        })
    }
  }, [editing, auth])


  return <>
    <Box align="center" mb="4">
      <Button onClick={() => ExportAsExcelFile(barData, "goldbarData")}>
        Export to excel
      </Button>
    </Box>
    <Text textAlign="center">Search by Serial Number</Text>
    <Box>
      <FormControl >
        <Grid templateColumns="repeat(10,1fr)">
          <GridItem colSpan={9} >
            <Input value={serialNumFilter} onChange={(v) => setSerialNumFilter(v.target.value)} placeholder="Please Input your serial number" style={searchBar} />
          </GridItem>
          <GridItem colSpan={1}>
            <Button style={searchButton}>
              <Search2Icon />
            </Button>
          </GridItem>
        </Grid>
      </FormControl>

      <Table variant="simple" mt="10" size="sm">
        <Thead>
          <Tr>
            <Th>Serial Number</Th>
            <Th>Brand</Th>
            <Th>Status</Th>
            <Th>Current Location</Th>
            <Th />
          </Tr>
        </Thead>
        <Tbody>
          {barData.filter(a => {
            const serialLower = a.serialNum.toLowerCase()
            const filterLower = String(serialNumFilter).toLowerCase()
            return serialLower.startsWith(filterLower) || serialLower.endsWith(filterLower)
          }).map(function (d, idx) {
            return (
              <React.Fragment key={idx}>
                <Tr onClick={() => {
                  setEditing(false);
                  expanded == idx ? setExpanded(null) : setExpanded(idx)
                }}>
                  <Td>
                    {d.serialNum}
                  </Td>
                  <Td>
                    {d.brandName}
                  </Td>
                  <Td>
                    {d.barStatus}
                  </Td>
                  <Td>
                    {d.currentLocation}
                  </Td>
                  <Td sx={hover}>
                    {expanded == idx ?
                      "Hide Details" :
                      "Show Details"
                    }
                  </Td>
                </Tr>
              </React.Fragment>
            )
          })}
        </Tbody>
      </Table>
    </Box>

    {expanded != null &&
      <ExpandedBox
        goldbar={barData[expanded]}
        editing={editing}
        setEditing={setEditing}
        updateData={updateData}
        setUpdateData={setUpdateData} />
    }
  </>
};

const AddGoldBar = () => {
  const [auth] = useSession();

  const addBarToDB = (data: object) => {
    axios.post(`/tracking/goldbar/add`, data, { headers: { 'Authorization': auth?.accessToken } })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  return (
    <Formik
      initialValues={{
        serialNum: '',
        brandName: '',
        fineness: '',
        netWeight: '',
        originCountry: '',
        image: '',
        currentLocation: '',
        barStatus: '',
        depositRef: '',
        stockOutRef: '',
        assayRef: '',
        refineRef: '',
        mintApprovalDate: '',
        dateReserved: '',
        releaseOrder: '',
        burnApprovalDate: ''
      }}
      enableReinitialize={true}
      onSubmit={(values, actions) => {
        setTimeout(() => {
          addBarToDB(values);
          actions.resetForm({});
        }, 1000)
      }}
    >
      {(props) => (
        <Form>
          <Stack spacing="6">
            <ChakraField name={'serialNum'} label={'Serial Number'} />
            <FormLabel>Brand Name</FormLabel>
            <Field
              as="select"
              name={'brandName'}
              style={{
                backgroundColor: '#16161D',
                border: '2px solid #3b3b43',
                borderRadius: '5px'
              }}
            >
              <option value="">Select Brand</option>
              <option value="GOLDZIP">GOLDZIP</option>
              <option value="LBMA">LBMA</option>
            </Field>
            <ChakraField name={'fineness'} label={'Fineness'} required={false} />
            <ChakraField name={'netWeight'} label={'Net Weight'} required={false} />
            <ChakraField name={'originCountry'} label={'Origin Country'} required={false} />
            <ImageUpload
              required={false}
              name={'image'} label={'Image'}
              onChange={(url: string) => props.setFieldValue('image', url)}
              filePath='goldBar'
            />
            <FormLabel>Current Location</FormLabel>
            <Field
              as="select"
              name={'currentLocation'}
              style={{
                backgroundColor: '#16161D',
                border: '2px solid #3b3b43',
                borderRadius: '5px'
              }}
            >
              <option value="">Select Current Location</option>
              <option value="Warehouse">Warehouse</option>
              <option value="Assay Center">Assay Center</option>
              <option value="Gold Shop">Gold Shop</option>
            </Field>
            <FormLabel>Bar Status</FormLabel>
            <Field
              as="select"
              name={'barStatus'}
              style={{
                backgroundColor: '#16161D',
                border: '2px solid #3b3b43',
                borderRadius: '5px'
              }}
            >
              <option value="">Select Bar Status</option>
              <option value="Waiting for Assay">Waiting for Assay</option>
              <option value="Assaying">Assaying</option>
              <option value="Reserved">Reserved</option>
              <option value="Waiting for Collection">Waiting for Collection</option>
              <option value="Collected">Collected</option>
            </Field>
            <ChakraField name={'depositRef'} label={'Deposit Reference'} required={false} />
            <ChakraField name={'stockOutRef'} label={'Stock Out Reference'} required={false} />
            <ChakraField name={'assayRef'} label={'Assay Reference'} required={false} />
            <ChakraField name={'refineRef'} label={'Refine Reference'} required={false} />
            <ChakraField name={'mintApprovalDate'} label={'Mint Approval Date'} required={false} />
            <ChakraField name={'dateReserved'} label={'Date Reserved'} required={false} />
            <ChakraField name={'releaseOrder'} label={'Release Order'} required={false} />
            <ChakraField name={'burnApprovalDate'} label={'Burn Approval Date'} required={false} />
            <Button colorScheme="blue" isLoading={props.isSubmitting} type="submit">
              Submit
            </Button>
          </Stack>
        </Form>
      )
      }
    </Formik >
  )
}

const ExcelUpload = () => {
  const [file, setFile] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    if (data != null) {
      console.log(JSON.stringify(data, null, 2));
    }
  }, [data])

  const SheetJSFT = [
    "xlsx", "xlsb", "xlsm", "xls", "xml", "csv", "txt", "ods", "fods", "uos", "sylk", "dif", "dbf", "prn", "qpw", "123", "wb*", "wq*", "html", "htm"
  ].map(function (x) { return "." + x; }).join(",");

  const handleChange = (e) => {
    const files = e.target.files;
    if (files && files[0]) {
      setFile(files[0])
    };
  };

  const handleFile = () => {
    /* Boilerplate to set up FileReader */
    const reader = new FileReader();
    const rABS = !!reader.readAsBinaryString;

    reader.onload = e => {
      /* Parse data */
      const bstr = e.target.result;
      const wb = XLSX.read(bstr, {
        type: rABS ? 'binary' : 'array',
        bookVBA: true
      });
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      /* Convert array of arrays */
      const xldata = XLSX.utils.sheet_to_json(ws);
      /* Update state */
      setData(xldata);
    };

    if (rABS) {
      reader.readAsBinaryString(file);
    } else {
      reader.readAsArrayBuffer(file);
    }
    ;
  };

  return (
    <Box>
      <Box align="center">
        Upload an excel to add gold bars to database
        <Box w="50%">
          <Input
            mt="4"
            type="file"
            className="form-control"
            id="file"
            accept={SheetJSFT}
            onChange={handleChange}
          />
        </Box>
        <Box w="50%">
          <Input
            mt="4"
            type="submit"
            value="Add bars to database"
            onClick={handleFile}
            disabled={file == null}
          />
        </Box>
      </Box>
    </Box>
  )
}

const trackingPage = () => {
  return (
    <Box>
      <Tabs isFitted>
        <TabList>
          <Tab>Track Goldbars</Tab>
          <Tab>Add Goldbar</Tab>
          <Tab>Excel Upload</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Tracking />
          </TabPanel>
          <TabPanel>
            <AddGoldBar />
          </TabPanel>
          <TabPanel>
            <ExcelUpload />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  )
}

export default trackingPage;
