import { useCallback, useEffect, useState } from 'react';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';

// Components UI
import Header, { Breadcrumb } from '../../components/Header';
import TelemetryLog from '../../components/TelemetryLog';
import { 
	Grid, 
	Paper, 
	Stack,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	OutlinedInput,
	Box,
	Chip,
	Typography,
	TextField,
	Button
} from '@mui/material';

// Utils
import { IComponent, IDataConfig, IMission, IModule, IRocketPopulated } from '../../utils/entities';
import { useActiveMission } from '../../utils/ActiveMissionContext';
import api from '../../services/api';
import ModuleStatus from '../../components/ModuleNew';
import { useSocketContext } from '../../utils/socket-context';
import SensorsOffIcon from '@mui/icons-material/SensorsOff';
import SensorsIcon from '@mui/icons-material/Sensors';

interface StartUpViewProps {
	rocket: IRocketPopulated;
	mission?: IMission;
}


export default function StartUpView(props: StartUpViewProps) {
	const [component, setComponent] = useState<IComponent>();
	const [connected, setConnected] = useState<boolean>(false);

	const sc = useSocketContext();

	const activeContext = useActiveMission();

	const breadCrumbs: Breadcrumb[] = [
		{ name: 'New Mission', path: '/', active: false },
		{ name: 'Start Up', path: '/', active: true }
	];

	const [dataConfig, setDataConfig] = useState<IDataConfig>();
	const [log, setLog] = useState<string[]>(['Not Data']);
	const getDataConfig = useCallback(async () => {
		try {
			if (component?.DataConfigId === undefined) return console.log('No Data Config Id');
			const response = await api.getDataConfig(component?.DataConfigId);
			const data = response.data as IDataConfig;
			setDataConfig(data);
		} catch (error) {
			console.log(error);
		}
	}, [component?.DataConfigId]);


	useEffect(() => {
		getDataConfig();
	}, [getDataConfig]);

	useEffect(() => {
		if (sc.aprsPacket.Data === undefined) return 
		setLog(prev => [...prev, JSON.stringify(sc.aprsPacket.Data) as string || '']);
	}, [sc.aprsPacket.Data]);
	return (
		<>
			<Grid container direction="column" paddingX="2rem" paddingY="2rem" gap={3}>
				{/* Page Header */}
				<Grid item>
					<Header breadCrumbs={breadCrumbs} />
				</Grid>

				{/* Parameters Controllers */}
				<Grid item>
					<Paper elevation={2} sx={{ padding: 2 }}>
                        <Stack direction="row" spacing={5} justifyContent={'space-between'} alignItems={'center'}>
							<Stack direction="row" alignItems={'center'} spacing={2}>
                                <RocketLaunchIcon sx={{ color: 'uvr.yellow' }} /> 
                                <Typography align='left' variant='h6'>
                                    {activeContext.rocket.Name || 'Mission Not found'}
                                </Typography>
                            </Stack>
							<Stack direction="row" alignItems={'center'} spacing={2}>
								<TextField 
										label='Mission' 
										size='small'
										value={activeContext.activeMission.Name} 
										defaultValue={activeContext.activeMission.Name}                                 
										InputLabelProps={{ shrink: true}}
									/>
								<FormControl sx={{ minWidth: 200 }}>
									<InputLabel id="telemetry-source-select-title">Component Details</InputLabel>
									<Select
										size="small"
										labelId="telemetry-source-select-label"
										id="telemetry-source-select"
										value={component?.Name || ''}
										onChange={(e, key: any) => setComponent(activeContext.rocket.Components[key.key.slice(2)])}
										input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
										renderValue={(selected: string) => (
											<Box
												sx={{
													display: 'flex',
													flexWrap: 'wrap',
													gap: 0.5,
													transform: 'translateY(20%)'
												}}
											>
												<Chip label={selected} />
											</Box>
										)}
										sx={{
											'& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
												border: 'none !important'
											}
										}}
									>
										{activeContext.rocket.Components.map((component, index) => (
											<MenuItem key={index} value={component.Name}>
												{component.Name}
											</MenuItem>
										))}							
									</Select>
								</FormControl>
								<Button
									startIcon={connected ? <SensorsIcon /> : <SensorsOffIcon />}
									variant='contained'
									onClick={() => setConnected(!connected)}
								>
									Connect
								</Button>
							</Stack>
                        </Stack>
                    </Paper>
				</Grid>
				<Grid container direction={'row'} gap={3}>
					<Grid item width={component?.Name === 'Big Red Bee' ? '100%' : '50%'}>
						<TelemetryLog 
							value={log.toString()}
							width='100%' 
							maxRows={15}
						/>
					</Grid>
					{component?.Name === 'Flight Computer' && 
						dataConfig && dataConfig.Modules.map((module: IModule) => {
							return (
								<Grid item>
									<ModuleStatus module={module} statusOnly />
								</Grid>
							)}
						)
					}
				</Grid>
			</Grid>
		</>
	);
}
