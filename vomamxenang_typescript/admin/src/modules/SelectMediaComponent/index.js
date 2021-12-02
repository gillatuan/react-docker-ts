import MediaRow from 'components/MediaRow'

const SelectMediaComponent = (props) => {
	const { error, disabled, id, info, label, name, fileSrc, toggleModal } = props

	return (
		<MediaRow
			error={error}
			disabled={disabled}
			fileSrc={fileSrc}
			id={id}
			info={info}
			label={label}
			name={name}
			toggleModal={toggleModal}
		/>
	)
}

export default SelectMediaComponent
