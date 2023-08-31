import React,{useState} from 'react'
import { Row,Col,Button } from 'react-bootstrap';
import CusTabButtons from '../../elements/CusTabButtons';
import { Box } from '../../elements';
import AddTransactionExpense from './AddTransactionExpense';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDeleteLeft, faCheck, faPrint, faClock, faFile } from '@fortawesome/free-solid-svg-icons';
import AddTransactionIncome from './AddTransactionIncome';
import AddTransactionWithdraw from './AddTransactionWithdraw';
export default function CreateCusOrderTansaction() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleItemClick = (index) => {
    setActiveIndex(index);
  };

  const buttonList = [
    { text: "Expense", index: 0, id: "" },
    { text: "Income ", index: 1, id: "1" },
    { text: "Withdraw ", index: 2, id: "2" },
  ];
  return (
    <div>
      <Row>
        <Col md={12}>
          <Box className={'d-flex'}>
        {buttonList.map((buttonText) => (
                <CusTabButtons
                  key={buttonText.index}
                  buttonText={buttonText}
                  activeIndex={activeIndex}
                  handleItemClick={handleItemClick}
                />
              ))}
              </Box>
        </Col>
        <Col md={12} className='cus-ptb-10'>
        {activeIndex === 0 && <AddTransactionExpense />}
        {activeIndex === 1 && <AddTransactionIncome />}
        {activeIndex === 2 && <AddTransactionWithdraw />}
        </Col>
        <Col md={6}>
        <Button className="cus-btn " >
                                       <FontAwesomeIcon icon={faFile}/> Make Report
                                    </Button>
        </Col>
       
        
      </Row>
    </div>
  )
}
