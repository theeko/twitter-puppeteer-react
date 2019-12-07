import React from "react";
import {
  Input,
  InputNumber,
  Row,
  Col,
  Checkbox,
  Typography,
  Divider
} from "antd";

import List from "../List/List";

const plainOptions = ["Latest", "b", "c"];
const defaultCheckedList = ["Latest", "b"];

export default function Search() {
  const [checkedList, setCheckedList] = React.useState(defaultCheckedList);
  const [isCheckedAll, setIsCheckedAll] = React.useState(false);
  const [howManyRecords, setHowManyRecords] = React.useState(10);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [items, setItems] = React.useState({});
  const [search, setSearch] = React.useState("");

  React.useEffect(() => {
    console.log("useEffect");
    const eventFunction = e => {
      if (e.key === "Enter") {
        handleSearch(search);
      }
    };

    document.addEventListener("keyup", eventFunction);

    return () => {
      document.removeEventListener("keyup", eventFunction);
    };
  }, [search]);

  const handleSearch = value => {
    console.log(checkedList);
    const start = Date.now();
    if (!value) return;
    setIsSubmitting(true);
    console.log("handleSearch value", value);
    console.log("handleSearch search value", search);
    console.log(process.env.NODE_ENV);

    fetch("http://localhost:5000/api", {
      method: "POST",
      body: JSON.stringify({
        search: value,
        howMany: howManyRecords,
        lastOnes: checkedList.includes("Latest")
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log("returned data is: ", data);
        if (data.error) {
          console.log(data.error);
        } else {
          setItems(data);
          console.log(`completed in ${start - Date.now()} ms`);
        }

        setIsSubmitting(false);
      })
      .catch(e => {
        console.log(e.message);
        setIsSubmitting(false);
      });
  };

  const handleCheckboxChange = checkedList => {
    setCheckedList(checkedList);
    if (checkedList.length === plainOptions.length) {
      setIsCheckedAll(true);
    } else {
      setIsCheckedAll(false);
    }
  };

  const onCheckAllChange = e => {
    if (e.target.checked) {
      setCheckedList(plainOptions);
      setIsCheckedAll(true);
    } else {
      setCheckedList([]);
      setIsCheckedAll(false);
    }
  };

  const handleNumberChange = value => {
    setHowManyRecords(value);
  };

  const handleArrayChange = key => newItemsArr => {
    setItems(prevItems => {
      prevItems[key] = newItemsArr;
      console.log(prevItems);
      return { ...prevItems };
    });
  };

  const handleSearchChange = e => {
    setSearch(e.target.value);
  };

  return (
    <>
      <Row type="flex" justify="space-around">
        <Col>
          <Input.Search
            placeholder="Separate your search queries with ','"
            style={{ minWidth: 300 }}
            onSearch={handleSearch}
            enterButton
            loading={isSubmitting}
            value={search}
            onChange={handleSearchChange}
          />
          <div style={{ padding: "20px 0" }}>
            <div style={{ borderBottom: "1px solid #E9E9E9" }}>
              <Checkbox onChange={onCheckAllChange} checked={isCheckedAll}>
                Check all
              </Checkbox>
              <InputNumber
                onChange={handleNumberChange}
                style={{ width: 100, marginLeft: 10 }}
                min={1}
                max={200}
                value={howManyRecords}
              />
            </div>
            <div style={{ padding: "10px 0" }}>
              <Checkbox.Group
                options={plainOptions}
                value={checkedList}
                onChange={handleCheckboxChange}
              />
            </div>
          </div>
        </Col>
      </Row>

      <Row type="flex" justify="center">
        <Col style={{ width: "80%", margin: "auto" }}>
          {Object.keys(items).map(key => {
            return (
              <React.Fragment key={key}>
                <Typography>
                  <Typography.Title level={3}>
                    {decodeURIComponent(key)}
                  </Typography.Title>
                </Typography>
                <List
                  key={key}
                  items={items[key]}
                  handleArrayChange={handleArrayChange(key)}
                />
                <Divider />
              </React.Fragment>
            );
          })}
        </Col>
      </Row>
    </>
  );
}
