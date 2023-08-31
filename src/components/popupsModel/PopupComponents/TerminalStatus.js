import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRotateRight,faXmark ,faCircle} from '@fortawesome/free-solid-svg-icons'
import { Box } from '../../elements'
import {Text} from '../../elements'
import { Button } from 'react-bootstrap'
export default function TerminalStatus({closeButton}) {
  return (
    <div>
         <Box className={'terminal-model-entity cus-ptb border-b'}>
                    <Box className={'terminal-model-entity'} > 
                        <Box className={'cus-p-10'}>
                            <FontAwesomeIcon icon={faCircle} color='red' />
                        </Box>
                        <Box>
                        <Text as={'span'} className={'f-13 bold'}> 192.168.19.100</Text><br/>
                        <Text as={'span'} className={'f-13 bold'}> Pending message 0</Text>
                        </Box>
                    </Box>
                    <Box>
                        <Button onClick={closeButton} className='cus-mr bg-gray'>Check</Button>
                        <Button onClick={closeButton} ><FontAwesomeIcon icon={faXmark}/></Button>
                    </Box>
                 </Box>
                 <Box className={'terminal-model-entity cus-ptb border-b'}>
                    <Box className={'terminal-model-entity'} > 
                        <Box className={'cus-p-10'}>
                            <FontAwesomeIcon icon={faCircle} color='red' />
                        </Box>
                        <Box>
                        <Text as={'span'} className={'f-13 bold'}> 192.168.19.100</Text><br/>
                        <Text as={'span'} className={'f-13 bold'}> Pending message 0</Text>
                        </Box>
                    </Box>
                    <Box>
                        <Button onClick={closeButton} className='cus-mr bg-gray'>Check</Button>
                        <Button onClick={closeButton} ><FontAwesomeIcon icon={faXmark}/></Button>
                    </Box>
                 </Box>
    </div>
  )
}
