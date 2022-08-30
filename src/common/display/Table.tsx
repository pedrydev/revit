import ArrowBack from '@mui/icons-material/ArrowBack';
import ArrowForward from '@mui/icons-material/ArrowForward';
import {
  Grid,
  IconButton,
  Paper,
  Table as MuiTable,
  TableBody,
  TableContainer,
  TableFooter,
  TableHead,
  Typography,
  useTheme,
} from '@mui/material';
import type { ElementType, ReactNode } from 'react';

export interface TableColumn<T> {
  align?: 'center' | 'left' | 'right';
  key?: string;
  render?: (obj: T) => ReactNode;
  title: string;
  width?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
}

export interface TableRecord {
  [key: string]: ReactNode;
  id: string;
}

export interface TableProps<T> {
  actions?: ReactNode;
  columns: TableColumn<T>[];
  component?: ElementType;
  data: T[];
  onBack?: () => void;
  onNext?: () => void;
  page?: number;
  rowsPerPage?: number;
  title?: ReactNode;
  total?: number;
}

export default function Table<T extends TableRecord>({
  actions,
  columns,
  component = Paper,
  data,
  onBack,
  onNext,
  page,
  rowsPerPage = 20,
  title,
  total,
}: TableProps<T>) {
  const theme = useTheme();

  return (
    <TableContainer component={component}>
      {(actions || title) && (
        <div className='flex items-center justify-between p-1.5'>
          {title && <Typography variant='h6'>{title}</Typography>}
          {actions}
        </div>
      )}
      <MuiTable>
        <TableHead>
          <Grid component='tr' container sx={{ backgroundColor: theme.palette.primary.main }}>
            {columns.map((col) => (
              <Grid key={col.title} className='p-1.5' component='th' item xs={col.width ?? true}>
                <Typography
                  align={col.align || 'left'}
                  color='primary.contrastText'
                  variant='body1'
                >
                  {col.title}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </TableHead>
        <TableBody>
          {data.length === 0 ? (
            <Grid component='tr' container>
              <Grid className='flex justify-center p-1.5' item xs>
                <Typography variant='h6'>No data</Typography>
              </Grid>
            </Grid>
          ) : (
            data.map((obj) => (
              <Grid key={obj.id} className='hover:bg-gray-100' component='tr' container>
                {columns.map((col) => (
                  <Grid
                    key={col.title}
                    className={`flex items-center ${
                      col.align
                        ? col.align === 'right'
                          ? 'justify-end'
                          : `justify-${col.align}`
                        : ''
                    } p-1.5`}
                    component='td'
                    item
                    xs={col.width ?? true}
                  >
                    {col.render ? (
                      col.render(obj)
                    ) : (
                      <Typography align={col.align ?? 'left'} variant='body2'>
                        {obj[col.key as string]}
                      </Typography>
                    )}
                  </Grid>
                ))}
              </Grid>
            ))
          )}
        </TableBody>
        {page && total && (
          <TableFooter>
            <Grid className='flex items-center justify-end space-x-1.5' component='tr' container>
              <Grid item>
                <IconButton disabled={page === 0} onClick={onBack}>
                  <ArrowBack />
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton disabled={(page + 1) * rowsPerPage >= total} onClick={onNext}>
                  <ArrowForward />
                </IconButton>
              </Grid>
              <Grid item>
                <Typography variant='body2'>
                  {page * rowsPerPage + 1} -{' '}
                  {(page + 1) * rowsPerPage >= total
                    ? page * rowsPerPage + (total % rowsPerPage)
                    : page * rowsPerPage + rowsPerPage}{' '}
                  de {total}
                </Typography>
              </Grid>
            </Grid>
          </TableFooter>
        )}
      </MuiTable>
    </TableContainer>
  );
}
