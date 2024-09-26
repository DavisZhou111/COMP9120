import psycopg2

#####################################################
##  Database Connection
#####################################################

'''
Connect to the database using the connection string
'''
def openConnection():
    # connection parameters - ENTER YOUR LOGIN AND PASSWORD HERE
    userid = "y24s2c9120_yzho5104"
    passwd = "zys141414.."
    myHost = "awsprddbs4836.shared.sydney.edu.au"


    # Create a connection to the database
    conn = None
    try:
        # Parses the config file and connects using the connect string
        conn = psycopg2.connect(database=userid,
                                    user=userid,
                                    password=passwd,
                                    host=myHost)

    except psycopg2.Error as sqle:
        print("psycopg2.Error : " + sqle.pgerror)
    
    # return the connection to use
    return conn

# def testConnection(conn):
#     if conn is not None:
#         try:
#             # Create a cursor to perform database operations
#             cur = conn.cursor()
#             # Executing a query
#             cur.execute("SELECT version();")
#             # Fetch result
#             db_version = cur.fetchone()
#             print("Connected to PostgreSQL server:", db_version)
#             cur.close()
#         except psycopg2.Error as e:
#             print("Error executing query:", e)
#     else:
#         print("Connection was not established")
#
# if __name__ == "__main__":
#     conn = openConnection()
#     testConnection(conn)
#     if conn is not None:
#         conn.close()
#         print("Database connection closed.")

'''
Validate staff based on username and password
'''
def checkLogin(login, password):

    return ['jdoe', 'John', 'Doe', 'jdoe@csh.com']

'''
List all the associated admissions records in the database by staff
'''
def findAdmissionsByAdmin(login):

    return


'''
Find a list of admissions based on the searchString provided as parameter
See assignment description for search specification
'''
def findAdmissionsByCriteria(searchString):

    return


'''
Add a new addmission 
'''
def addAdmission(type, department, patient, condition, admin):
    
    return


'''
Update an existing admission
'''
def updateAdmission(id, type, department, dischargeDate, fee, patient, condition):
    

    return
