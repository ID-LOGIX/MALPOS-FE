import React from 'react'
import { Row,Col, Table } from 'react-bootstrap'
import { Box } from '../../components/elements'
import { Th, Thead, Tr } from '../../components/elements/Table'
import {Text} from '../../components/elements'
import { LabelField } from '../../components/fields'
export default function OfflineAchieveReceipt() {
  return (
    <div>
         <Row>
            <Col md={12}>
                <Table>
                    <Thead>
                        <Tr className={'verticle-align-m'}>
                        <Th><h4>Apri 3</h4>
                        <Text className={'f-13 bold'} as='span'>22:33</Text>
                        </Th>
                        <Th>
                        <h4>#3424</h4>
                        <Text className={'f-13 bold open-receipt-span'} as='span'>Ahmed</Text>
                        </Th>
                        <Th>
                        <Text className={'f-13 bold open-receipt-span'} as='span'>Takeaway</Text>
                        </Th>
                        <Th> <h2 className='text-end secound-color'> 15 ریال</h2> </Th>
                        </Tr>
                    </Thead>
                </Table>
            </Col>
        </Row>
    </div>
  )
}
