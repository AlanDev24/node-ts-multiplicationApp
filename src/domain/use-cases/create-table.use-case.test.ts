import { CreateTable } from './create-table.use-case';


describe('CreateTableUseCase', () => {
    test('should create table with default values', () => {

        const createTable = new CreateTable();

        const table = createTable.execute({base: 2});
        const row = table.split('\n').length;
        expect(createTable).toBeInstanceOf(CreateTable);
        expect(row).toBeGreaterThanOrEqual(10);
    });

    test('should create a table with custom values', () => {
        const options = {
            base: 3,
            limit: 20
        }

        const createTable = new CreateTable();

        const table = createTable.execute(options);
        const row = table.split('\n').length;
        expect(row).toBeGreaterThanOrEqual(20);
        expect(table).toContain('3 * 1 = 3')
        expect(table).toContain('3 * 2 = 6')
        expect(table).toContain('3 * 3 = 9')
    })
})