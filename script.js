// User Accounts Database
const users = {
    'admin': { password: 'admin123', type: 'admin' },
    'user': { password: 'user123', type: 'user' }
};

// Sample Data
let sheetData = [
    { number: 1, letter: 'A', type: 'S', remarks: 'First Entry' },
    { number: 2, letter: 'B', type: 'S', remarks: 'Second Entry' },
    { number: 3, letter: 'C', type: 'S', remarks: 'Third Entry' },
    { number: 4, letter: 'D', type: 'S', remarks: 'Fourth Entry' }
];

// Login Function
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const userType = document.querySelector('input[name="userType"]:checked').value;

    if (users[username] && users[username].password === password && users[username].type === userType) {
        showDashboard(username, userType);
    } else {
        alert('❌ Invalid login credentials! Please check username, password and user type.');
    }
}

// Show Dashboard based on user type
function showDashboard(username, userType) {
    document.querySelector('.login-container').style.display = 'none';
    document.querySelector('.dashboard').style.display = 'grid';
    
    // Show user info
    const userInfo = document.createElement('div');
    userInfo.className = 'user-info';
    userInfo.innerHTML = `
        👤 ${username} (${userType}) 
        <button class="logout-btn" onclick="logout()">Logout</button>
    `;
    document.body.appendChild(userInfo);
    
    loadDashboardData(userType);
}

// Load data based on user role
function loadDashboardData(userType) {
    const dataTableBody = document.getElementById('dataTableBody');
    dataTableBody.innerHTML = '';
    
    sheetData.forEach(row => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${row.number}</td>
            <td>${row.letter}</td>
            <td>${row.type}</td>
            <td>${row.remarks}</td>
        `;
        dataTableBody.appendChild(tr);
    });
    
    // Show admin controls only for admin
    const adminControls = document.getElementById('adminControls');
    if (userType === 'admin') {
        adminControls.style.display = 'block';
    } else {
        adminControls.style.display = 'none';
    }
    
    updateStats();
}

// Admin Functions
function addData() {
    if (confirm('Add new data entry?')) {
        const newNumber = sheetData.length + 1;
        const newLetter = String.fromCharCode(64 + newNumber);
        const newEntry = {
            number: newNumber,
            letter: newLetter,
            type: 'S',
            remarks: `New Entry ${newNumber}`
        };
        sheetData.push(newEntry);
        loadDashboardData('admin');
        alert('✅ Data added successfully!');
    }
}

function editData() {
    alert('✏️ Admin Feature: Edit data functionality would open here.');
}

function deleteData() {
    if (confirm('🗑️ Delete last entry?')) {
        sheetData.pop();
        loadDashboardData('admin');
        alert('✅ Last entry deleted!');
    }
}

function updateStats() {
    document.getElementById('totalEntries').textContent = sheetData.length;
    document.getElementById('userCount').textContent = Object.keys(users).length;
}

function logout() {
    document.querySelector('.login-container').style.display = 'block';
    document.querySelector('.dashboard').style.display = 'none';
    document.querySelector('.user-info').remove();
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    // Create dashboard HTML dynamically
    const dashboardHTML = `
        <div class="dashboard">
            <div class="user-info" style="display:none"></div>
            
            <div class="premium-card">
                <div class="card-title">📊 DATA OVERVIEW</div>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                    <div class="stat-item">
                        <div class="stat-value" id="totalEntries">0</div>
                        <div class="stat-label">Total Entries</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-value" id="userCount">2</div>
                        <div class="stat-label">Total Users</div>
                    </div>
                </div>
            </div>

            <div class="premium-card">
                <div class="card-title">📋 DATA TABLE</div>
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Number</th>
                            <th>Letter</th>
                            <th>Type</th>
                            <th>Remarks</th>
                        </tr>
                    </thead>
                    <tbody id="dataTableBody"></tbody>
                </table>
                
                <div class="admin-controls" id="adminControls">
                    <div class="card-title">🛠️ ADMIN CONTROLS</div>
                    <button class="control-btn" onclick="addData()">➕ Add Data</button>
                    <button class="control-btn" onclick="editData()">✏️ Edit Data</button>
                    <button class="control-btn" onclick="deleteData()">🗑️ Delete Data</button>
                </div>
            </div>

            <div class="premium-card">
                <div class="card-title">👥 USER GUIDE</div>
                <p><strong>Admin:</strong> Can add, edit, delete data</p>
                <p><strong>User:</strong> Can only view data</p>
                <p><strong>Demo Accounts:</strong></p>
                <p>Admin: admin / admin123</p>
                <p>User: user / user123</p>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', dashboardHTML);
});
