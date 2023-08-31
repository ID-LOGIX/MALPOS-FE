import React from 'react'
import { LabelField, LabelTextarea } from '../../fields'
import { Box, Text } from '../../elements'
import { Col, Row } from 'react-bootstrap'
export default function AddTransactionIncome() {
  return (
    <div>
         <Row>
            <Col md={3}>
                <Text as={'span'} className={'bold'}> Operation </Text>
            </Col>
            <Col md={9}>
            <Box className="cus-mt-5">
        <LabelField type={'text'} fieldSize={'w100'} placeholder={'Amount Type'} label={'Amount Type'}/>
        </Box>
        <Box className="cus-mt-5">
        <LabelField
                            label="Select Category"
                            option={["Ajdustment"]}
                            fieldSize="w100"
                        />             </Box>
        <Box className="cus-mt-5">
        <LabelTextarea fieldSize={'w100'} placeholder={'Description'} label={'Description'}/>
        </Box>
            </Col>
        </Row>
    </div>
  )
}
