import React from 'react'
import {Form} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
export default function IconSearchBar({placeholder}) {
  return (
    <div>
         <div style={{ position: "relative" }}>
                                                <Form.Control
                                                    type="search"
                                                    placeholder={`${placeholder}`}
                                                    className="search-pl"
                                                />
                                                <span
                                                    style={{
                                                        position: "absolute",
                                                        top: "50%",
                                                        right: "10px",
                                                        transform: "translateY(-50%)",
                                                        fontSize: "14px",
                                                    }}
                                                >
                                                    <button type="submit">
                                                        <FontAwesomeIcon icon={faSearch} />
                                                    </button>
                                                </span>
                                            </div>
    </div>
  )
}
