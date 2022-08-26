import TaskFilter from "./TaskFilter";
import TaskForm from "./TaskForm";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import EditIcon from "@mui/icons-material/Edit";
import FilterListIcon from "@mui/icons-material/FilterList";
import { Chip, Collapse, TableContainer } from "@mui/material";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { alpha } from "@mui/material/styles";
import { visuallyHidden } from "@mui/utils";
import Loader from "components/Loader";
import { deleteTask, getTasks, patchTask } from "fetches/tasks";
import useTranslate from "hooks/useTranslate";
import * as React from "react";
import { useState } from "react";
import useSWR from "swr";
import { TaskType, TaskFilterType } from "types/tasks";

enum ImportanceType {
  LOW = "Low",
  MID = "Mid",
  HIGH = "High",
}

type Order = "asc" | "desc";

function importanceLabel(importance: ImportanceType) {
  switch (importance) {
    case ImportanceType.LOW:
      return "lower";
    case ImportanceType.MID:
      return "mild";
    case ImportanceType.HIGH:
      return "important";
  }
}

function importanceColor(importance: ImportanceType) {
  switch (importance) {
    case ImportanceType.LOW:
      return "success";
    case ImportanceType.MID:
      return "warning";
    case ImportanceType.HIGH:
      return "error";
  }
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof TaskType;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "name",
  },
  {
    id: "importance",
    numeric: false,
    disablePadding: false,
    label: "importance",
  },
  {
    id: "responsable",
    numeric: false,
    disablePadding: false,
    label: "assigned to",
  },
  {
    id: "date_created",
    numeric: false,
    disablePadding: false,
    label: "date",
  },
  {
    id: "marked",
    numeric: false,
    disablePadding: false,
    label: "done",
  },
];

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof TaskType
  ) => void;
  onSelectAllClick: (event: any) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler =
    (property: keyof TaskType) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  const t = useTranslate();
  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onClick={onSelectAllClick}
            inputProps={{
              "aria-label": "select all tasks",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {t(headCell.label)}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell padding="normal"></TableCell>
      </TableRow>
    </TableHead>
  );
}

interface EnhancedTableToolbarProps {
  numSelected: number;
  handleOpen: Function;
  handleFilter: Function;
  deleteAll: Function;
  markAll: Function;
}

const EnhancedTableToolbar = ({
  numSelected,
  handleOpen,
  handleFilter,
  deleteAll,
  markAll,
}: EnhancedTableToolbarProps) => {
  const t = useTranslate();
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {t("{0} selected", numSelected)}
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h2"
          id="tableTitle"
          component="div"
        >
          {t("todo list")}
        </Typography>
      )}
      {numSelected > 0 ? (
        <>
          <Tooltip title={t("done all task")}>
            <IconButton
              onClick={() => {
                markAll();
              }}
            >
              <DoneAllIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title={t("delete")}>
            <IconButton
              onClick={() => {
                deleteAll();
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </>
      ) : (
        <>
          <Tooltip title={t("create task")}>
            <IconButton
              onClick={() => {
                handleOpen();
              }}
            >
              <AddIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title={t("filter")}>
            <IconButton
              onClick={() => {
                handleFilter();
              }}
            >
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        </>
      )}
    </Toolbar>
  );
};

interface ParamsType extends TaskFilterType {
  limit: number;
  offset: number;
  [key: string]: any;
}

export default function TaskTable() {
  const [params, setParams] = useState<ParamsType>({ limit: 25, offset: 0 });
  const { data, error, mutate } = useSWR(() => {
    const ret = { ...params };
    ret.importance =
      typeof params.importance !== "string"
        ? params.importance?.join(",")
        : undefined;
    return ret;
  }, getTasks);
  const isLoading = !data && !error;

  const t = useTranslate();

  const [selected, setSelected] = useState<readonly number[]>([]);
  const [opened, setOpened] = useState<readonly number[]>([]);
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof TaskType>("date_created");
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState(false);
  const [task, setTask] = useState<TaskType | undefined>(undefined);

  const handleRequestSort = (
    _: React.MouseEvent<unknown>,
    property: keyof TaskType
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
    const ordering = isAsc ? property : `-${property}`;
    setParams((prev) => ({ ...prev, ordering }));
  };

  const handleDelete = async (id: number, noMutate: boolean = false) => {
    try {
      await deleteTask(id);
    } catch (exception) {}
    if (!noMutate) mutate();
  };

  const handleDeleteAll = () => {
    selected.forEach(async (id) => {
      await handleDelete(id, true);
    });
    mutate();
  };

  const handleMarkAll = () => {
    selected.forEach(async (id) => {
      try {
        await patchTask(id, { marked: true });
      } catch (exception) {}
    });
    mutate();
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = data?.results.map((n: TaskType) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const onChangeDone = async (event: any, id: number) => {
    event.stopPropagation();

    const marked = event.target.checked;
    try {
      await patchTask(id, { marked });
    } catch (exception) {}
    mutate();
  };

  const handleFilter = () => {
    setFilter(true);
  };

  const handleForm = (task?: TaskType) => {
    setOpen(true);
    setTask(task);
  };

  const closeForm = () => {
    setOpen(false);
    setTask(undefined);
    mutate();
  };

  const closeFilter = () => {
    setFilter(false);
    mutate();
  };

  const handleClick = (event: any, id: number) => {
    event.stopPropagation();

    const selectedIndex = opened.indexOf(id);
    let newSelected: readonly number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(opened, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(opened.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(opened.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        opened.slice(0, selectedIndex),
        opened.slice(selectedIndex + 1)
      );
    }

    setOpened(newSelected);
  };

  const handleSelect = (event: any, id: number) => {
    event.stopPropagation();

    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (_: unknown, newPage: number) => {
    setParams((prev) => ({ ...prev, offset: prev.limit * newPage }));
    setSelected([]);
    mutate();
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const limit = parseInt(event.target.value, 10);
    setParams((prev) => ({ ...prev, limit, offset: 0 }));
    setSelected([]);
    mutate();
  };

  const isSelected = (id: number) => selected.indexOf(id) !== -1;
  const isOpened = (id: number) => opened.indexOf(id) !== -1;

  return (
    <>
      {isLoading && <Loader />}
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <EnhancedTableToolbar
            numSelected={selected.length}
            handleOpen={handleForm}
            deleteAll={handleDeleteAll}
            markAll={handleMarkAll}
            handleFilter={handleFilter}
          />
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={"medium"}
            >
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={data?.count ?? 0}
              />
              <TableBody>
                {data?.results.map((row: Required<TaskType>, index: number) => {
                  const isItemSelected = isSelected(row.id);
                  const isItemOpened = isOpened(row.id);
                  const labelId = `table-checkbox-${index}`;

                  return (
                    <>
                      <TableRow
                        hover
                        onClick={(event) => handleClick(event, row.id)}
                        tabIndex={-1}
                        key={row.id}
                        sx={{ "& > *": { borderBottom: "unset" } }}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            color="primary"
                            checked={isItemSelected}
                            aria-checked={isItemSelected}
                            inputProps={{
                              "aria-labelledby": labelId,
                            }}
                            onClick={(event) => handleSelect(event, row.id)}
                          />
                        </TableCell>
                        <TableCell
                          component="th"
                          id={labelId}
                          scope="row"
                          padding="none"
                        >
                          {row.name}
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={t(importanceLabel(row.importance))}
                            variant="outlined"
                            color={importanceColor(row.importance)}
                            size={"medium"}
                          />
                        </TableCell>
                        <TableCell>{row.responsable}</TableCell>
                        <TableCell>
                          {new Date(row.date_created).toLocaleString()}
                        </TableCell>
                        <TableCell padding="checkbox">
                          <Checkbox
                            color="success"
                            checked={row.marked}
                            inputProps={{
                              "aria-labelledby": labelId,
                            }}
                            onClick={(event) => onChangeDone(event, row.id)}
                          />
                        </TableCell>
                        <TableCell>
                          <>
                            <Tooltip title={t("edit")}>
                              <IconButton
                                onClick={(event) => {
                                  event.stopPropagation();
                                  handleForm(row);
                                }}
                              >
                                <EditIcon />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title={t("delete")}>
                              <IconButton
                                onClick={(event) => {
                                  event.stopPropagation();
                                  handleDelete(row.id);
                                }}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </Tooltip>
                          </>
                        </TableCell>
                      </TableRow>
                      <TableRow key={"detail"}>
                        <TableCell
                          style={{ paddingBottom: 0, paddingTop: 0 }}
                          colSpan={7}
                        >
                          <Collapse
                            in={isItemOpened}
                            timeout="auto"
                            unmountOnExit
                          >
                            <Box sx={{ margin: 1 }}>
                              <Typography
                                variant="h6"
                                gutterBottom
                                component="div"
                              >
                                Description
                              </Typography>
                              <p style={{ whiteSpace: "pre-line" }}>
                                {row.description}
                              </p>
                              <Typography
                                variant="h6"
                                gutterBottom
                                component="div"
                              >
                                Date Completed
                              </Typography>
                              <p>
                                {new Date(row.date_completed).toLocaleString()}
                              </p>
                            </Box>
                          </Collapse>
                        </TableCell>
                      </TableRow>
                    </>
                  );
                })}
                {data?.results > 0 && (
                  <TableRow
                    style={{
                      height: 53,
                    }}
                  >
                    <TableCell colSpan={7} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={data?.count ?? 0}
            rowsPerPage={params.limit}
            page={params.offset / params.limit}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage={t("rows per page:")}
          />
        </Paper>
      </Box>
      <TaskForm task={task} open={open} handleClose={closeForm} />
      <TaskFilter
        open={filter}
        handleClose={closeFilter}
        filter={params}
        setFilter={setParams}
      />
    </>
  );
}
