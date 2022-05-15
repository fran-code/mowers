
import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import { IMowers, IMowersError, IMowersPosition } from '../../utils/interfaces';
import '../components.css'

const directionValues = ["N", "E", "S", "W"]
const validLettersPath = ["L", "R", "M"]

interface IProps {
    onSubmit: Function;
    valuesForm?: IMowers;
    title?: string;
}

const initialMower: IMowersPosition = {
    position: {
        posX: 0,
        posY: 0,
        direction: "N"
    },
    path: ""
}

const initialFormState: IMowers = {
    sizeX: 1,
    sizeY: 1,
    mowers: [initialMower]
}

const findFormErrors = (form: IMowers) => {
    const { mowers } = form
    const newErrors: IMowersError = {}

    mowers.forEach((mow, index) => {
        if (!mow.path || mow.path === "") newErrors[index] = 'Cannot be blank!'

        for (let x = 0; x < mow.path.length; x++) {
            if (!validLettersPath.includes(mow.path[x].toUpperCase())) {
                newErrors[index] = 'Only the letters L,R,M are allowed!'
                break;
            }
        }
    })

    return newErrors
}

const MowersPosition: React.FC<IProps> = ({ onSubmit, valuesForm, title }) => {
    const [formState, setFormState] = useState<IMowers>(valuesForm || initialFormState)
    const [mowersCount, setMowersCount] = useState<number>(1)
    const [errors, setErrors] = useState<IMowersError>({})

    const onChangeForm = (currentValues: IMowers, errors: IMowersError, e: any) => {
        let { name, value, tabIndex } = e.target
        value = isNaN(value) ? value : Number(value)

        if (tabIndex > -1) {
            const newMowers = JSON.parse(JSON.stringify(currentValues.mowers))
            if (name === "path") {
                newMowers[tabIndex].path = value
            } else {
                newMowers[tabIndex].position[name] = value
            }
            setFormState({ ...currentValues, mowers: newMowers })
        } else {
            setFormState({ ...currentValues, [name]: value })
        }

        // Check and see if errors exist, and remove them from the error object:  
        if (!!errors[tabIndex as keyof IMowersError]) {
            const newErrors = { ...errors }
            delete newErrors[tabIndex]
            setErrors(newErrors)
        }
    }

    const onFormSubmit = (e: any, formValues: IMowers) => {
        e.preventDefault()
        const newErrors = findFormErrors(formValues)
        if (Object.keys(newErrors).length) {
            setErrors(newErrors)
        } else {
            onSubmit(formValues)
        }
    }

    const addMower = () => {
        setMowersCount(mowersCount + 1)
        setFormState({ ...formState, mowers: [...formState.mowers, initialMower] })
    }

    const removeMower = () => {
        setMowersCount(mowersCount - 1)
        setFormState({ ...formState, mowers: [...formState.mowers.splice(0, formState.mowers.length - 1)] })
    }

    return (
        <div className="mowersForm" data-testid="mowersForm">
            {title && <h1 className="mb_20px textCenter">{title}</h1>}
            <Form noValidate onSubmit={(e) => onFormSubmit(e, formState)}>
                <b>Plateau</b>
                <Form.Row>
                    <Form.Group as={Col} md="3" controlId="sizeX">
                        <Form.Label>Size X</Form.Label>
                        <Form.Control
                            required
                            name="sizeX"
                            type="number"
                            tabIndex={-1}
                            min={1}
                            onChange={e => onChangeForm(formState, errors, e)}
                            value={formState.sizeX}
                        />
                    </Form.Group>
                    <Form.Group as={Col} md="3" controlId="sizeY">
                        <Form.Label>Size Y</Form.Label>
                        <Form.Control
                            required
                            name="sizeY"
                            type="number"
                            tabIndex={-1}
                            min={1}
                            onChange={e => onChangeForm(formState, errors, e)}
                            value={formState.sizeY}
                        />
                    </Form.Group>
                </Form.Row>
                {new Array(mowersCount).fill(0).map((move, index) => {

                    const { posX, posY, direction } = formState.mowers[index]?.position
                    const path = formState.mowers[index]?.path
                    const pathError = errors[index]

                    return (
                        <div key={index}>
                            <b>Mower {index + 1}</b>
                            <Form.Row>
                                <Form.Group as={Col} md="2" controlId="posX">
                                    <Form.Label>Position X</Form.Label>
                                    <Form.Control
                                        required
                                        name='posX'
                                        type="number"
                                        tabIndex={index}
                                        min={0}
                                        max={formState.sizeX - 1}
                                        onChange={e => onChangeForm(formState, errors, e)}
                                        value={posX}
                                    />
                                </Form.Group>
                                <Form.Group as={Col} md="2" controlId="sizeY">
                                    <Form.Label>Position Y</Form.Label>
                                    <Form.Control
                                        required
                                        name="posY"
                                        type="number"
                                        tabIndex={index}
                                        min={0}
                                        max={formState.sizeY - 1}
                                        onChange={e => onChangeForm(formState, errors, e)}
                                        value={posY}
                                    />
                                </Form.Group>
                                <Form.Group as={Col} md="2" controlId="direction">
                                    <Form.Label>Direction</Form.Label>
                                    <Form.Control
                                        as="select"
                                        onChange={e => onChangeForm(formState, errors, e)}
                                        name="direction"
                                        value={direction}
                                        tabIndex={index}
                                    >
                                        {directionValues.map(dir => <option key={dir} value={dir}>{dir}</option>)}
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group as={Col} md="6" controlId="path">
                                    <Form.Label>Path</Form.Label>
                                    <Form.Control
                                        required
                                        name="path"
                                        type="string"
                                        tabIndex={index}
                                        onChange={e => onChangeForm(formState, errors, e)}
                                        value={path}
                                        isInvalid={!!pathError}
                                    />
                                    <Form.Control.Feedback type='invalid'>
                                        {pathError}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Form.Row>
                        </div>
                    )
                }
                )}
                <div className="flex spaceEvenly mb_20px mt_30px">
                    <Button size="sm" onClick={addMower}>Add Mower</Button>
                    {formState.mowers.length > 1 && <Button size="sm" onClick={removeMower}>Remove Mower</Button>}
                </div>
                <Button block size="lg" type="submit" disabled={Object.keys(errors).length > 0} style={{ height: "65px" }}>
                    Calculate
                </Button>
            </Form>
        </div>
    );
}

export default MowersPosition;